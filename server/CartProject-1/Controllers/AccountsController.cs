using CartProject_1.Dto;
using CartProject_1.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CartProject_1.Controllers
{
    public class AccountsController : ControllerBase
    {
        private readonly AccountsService _service;

        public AccountsController(AccountsService service)
        {
            _service = service;
        }


        [HttpPost("user/register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostUser([FromBody] UserCreateDto dto)
        {
            if (dto == null)
            {
                return BadRequest("User data is missing.");
            }
            var result = await _service.CreateUserAsync(dto);
            if (!result.IsValid)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostLogin([FromBody] LoginDto dto)
        {
            var result = await _service.LoginAsync(dto);
            if (result.IsValid)
                return Ok(result);

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet("profile")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetProfile()
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userClaims = User.Claims.ToList();
            if(id == null)
            {
                return BadRequest(userClaims);
            }
            var user = await _service.GetProfileAsync(id);
            return user == null ? NotFound() : Ok(user);
        }

        //[Authorize]
        //[HttpGet("profile/{id}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public async Task<IActionResult> GetProfileById(string id)
        //{
        //    var user = await _service.GetProfileByIdAsync(id);
        //    return user == null ? NotFound() : Ok(user);
        //}

        //[Authorize]
        [HttpGet("UserProfiles")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetUserProfile()
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _service.GetAllProfileAsync();
            return user == null ? NotFound() : Ok(user);
        }

        //[Authorize]
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateProfile(UserCreateDto dto)
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _service.UpdateAsync(id, dto);
            return user == null ? NotFound() : Ok(user);
        }
    }
}
