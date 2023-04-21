using CartProject_1.Data;
using CartProject_1.Dto;
using CartProject_1.Models;
using CartProject_1.Types;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CartProject_1.Services
{
    public class AccountsService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _db;

        public AccountsService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager,
            SignInManager<ApplicationUser> signInManager, IConfiguration configuration, ApplicationDbContext db)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _db = db;
        }

        public async Task<ServiceResponse<bool>> CreateUserAsync(UserCreateDto dto)
        {
            var response = new ServiceResponse<bool>();

            var user = new ApplicationUser()
            {
                Name = dto.Name,
                Email = dto.Email,
                DateOfBirth = dto.DateOfBirth,
                PhoneNumber = dto.PhoneNumber,
                UserName = Guid.NewGuid().ToString()
            };

            var userstatus = await _userManager.CreateAsync(user, dto.Password);
            if (!userstatus.Succeeded)
            {
                response.AddError("", "Failed to register user");
                return response;
            }

            await _userManager.AddToRoleAsync(user, "User");

            response.Result = true;
            return response;

        }
        public async Task<ServiceResponse<string>> LoginAsync(LoginDto dto)
        {
            var response = new ServiceResponse<string>();

            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                response.AddError("error","An account with this email does not exist.");
                return response;
            }

            var signin = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, true);
            if (signin.Succeeded)
            {
                response.Result = GenerateToken(user);
                return response;
            }

            // If the signin failed, generate error messages.
            if (signin.IsLockedOut)
                response.AddError("", "Account locked.");
            else if (signin.IsNotAllowed)
                response.AddError("", "You are not allowed to signin.");
            else
                response.AddError("", "Invalid email/password.");

            return response;
        }

        public async Task<ProfileViewDto> GetProfileAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            //return new ProfileViewDto
            //{
            //    Name = user.Name,
            //    Email = user.Email,
            //    DateOfBirth= user.DateOfBirth,
            //    PhoneNumber= user.PhoneNumber
            //};

            var user1 = await _db.ApplicationUsers
                .FirstOrDefaultAsync(m => m.Id == id);

            return new()
            {
                Id = id,
                Name = user1.Name,
                Email = user1.Email,
                DateOfBirth = user1.DateOfBirth,
                PhoneNumber = user1.PhoneNumber,
            };
        }

        public async Task<ProfileViewDto> GetProfileByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            var user1 = await _db.ApplicationUsers
                .FirstOrDefaultAsync(m => m.Id == id);

            return new()
            {
                Id = user1.Id,
                Name = user1.Name,
                Email = user1.Email,
                DateOfBirth = user1.DateOfBirth,
                PhoneNumber = user1.PhoneNumber,
            };
        }

        public async Task<ProfileViewDto[]> GetAllProfileAsync()
        {
            var res = await _userManager.GetUsersInRoleAsync("User");
            return res.Select(m => new ProfileViewDto
            {
                Id = m.Id,
                Name = m.Name,
                Email = m.Email,
                DateOfBirth = m.DateOfBirth,
                PhoneNumber = m.PhoneNumber
            }).ToArray();
        }

        public async Task<ServiceResponse<ProfileViewDto>?> UpdateAsync(string id, UserCreateDto dto)
        {
            var result = new ServiceResponse<ProfileViewDto>();

            var user = await _db.ApplicationUsers.FindAsync(id);

            if (user == null)
            {
                return null;
            }

            user.Name = dto.Name;
            user.Email = dto.Email;
            user.DateOfBirth = DateTime.UtcNow;
            user.PhoneNumber = dto.PhoneNumber;

            await _db.SaveChangesAsync();

            result.Result = new ProfileViewDto
            {
                Name = user.Name,
                Email = user.Email,
                DateOfBirth = user.DateOfBirth,
                PhoneNumber = user.PhoneNumber,
            };
            return result;
        }
        private string GenerateToken(ApplicationUser user)
        {
            var role = _userManager.GetRolesAsync(user)
                .GetAwaiter()
                .GetResult()
                .First();

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, $"{user.Name}"),
                new Claim(ClaimTypes.Role, role)
            };

            string issuer = _configuration["Jwt:Issuer"];
            string audience = _configuration["Jwt:Audience"];
            string key = _configuration["Jwt:Key"];

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(signingKey, "HS256");

            var token = new JwtSecurityToken(
                issuer,
                audience,
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
