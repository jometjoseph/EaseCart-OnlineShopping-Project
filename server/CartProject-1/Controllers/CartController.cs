using CartProject_1.Data;
using CartProject_1.Dto;
using CartProject_1.Models;
using CartProject_1.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CartProject_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [ProducesResponseType(typeof(CartViewDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(CartViewDto), StatusCodes.Status400BadRequest)]
        public async Task<List<CartViewDto>> GetAllCartproductsAsync()
        {
            return await _context.Carts
                .Include(p => p.Product)
                .ThenInclude(c => c.Category)
                .Select(c => new CartViewDto
                {
                    Id = c.Id,
                    Status = c.Status,
                    Product = new()
                    {
                        Id = c.ProductId,
                        Name = c.Product.Name,
                        Description= c.Product.Description,
                        ImageUrl = c.Product.ImageUrl,
                        Price = c.Product.Price,
                        Rating = c.Product.Rating,
                        Quantity = c.Product.Quantity,
                        Category = new()
                        {
                            Id = c.Product.CategoryId,
                            Name = c.Product.Category.Name,
                            Description = c.Product.Category.Description
                        }
                    },
                    ApplicationUser = new()
                    {
                        Id = c.ApplicationUserId,
                        Name = c.ApplicationUser.Name,
                        Email= c.ApplicationUser.Email,
                        PhoneNumber= c.ApplicationUser.PhoneNumber,
                        DateOfBirth = c.ApplicationUser.DateOfBirth
                    }

                }).ToListAsync();
        }

        [HttpGet("UserCart")]
        [ProducesResponseType(typeof(CartViewDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(CartViewDto), StatusCodes.Status400BadRequest)]
        public async Task<List<CartViewDto>> GetAllCartByUserIdAsync()
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return await _context.Carts
                .Where(m => m.ApplicationUserId == id)
                .Include(m => m.ApplicationUser)
                .Include(p => p.Product)
                .ThenInclude(c => c.Category)
                .Select(c => new CartViewDto
                {
                    Id = c.Id,
                    Status= c.Status,
                    Product = new()
                    {
                        Id = c.ProductId,
                        Name = c.Product.Name,
                        Description = c.Product.Description,
                        ImageUrl = c.Product.ImageUrl,
                        Price = c.Product.Price,
                        Rating = c.Product.Rating,
                        Quantity = c.Product.Quantity,
                        Category = new()
                        {
                            Id = c.Product.CategoryId,
                            Name = c.Product.Category.Name,
                            Description = c.Product.Category.Description
                        }
                    },
                    ApplicationUser = new()
                    {
                        Id = c.ApplicationUserId,
                        Name = c.ApplicationUser.Name,
                        Email = c.ApplicationUser.Email,
                        PhoneNumber = c.ApplicationUser.PhoneNumber,
                        DateOfBirth = c.ApplicationUser.DateOfBirth
                    }

                }).ToListAsync();
        }

        [HttpPost]
        [ProducesResponseType(typeof(CartCreateDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(CartCreateDto), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> CreateCartAsync(CartCreateDto dto)
        {
            var result = new ServiceResponse<CartViewDto>();

            if (await _context.Carts.AnyAsync(m => m.ProductId == dto.ProductId && m.ApplicationUserId == dto.ApplicationUserID))
                result.AddError(nameof(dto.ProductId), "Product already added to the cart");

            if (!result.IsValid)
                return BadRequest(result);

            var cartProduct = new Cart
            {
                Status = Status.now,
                ProductId = dto.ProductId,
                ApplicationUserId = dto.ApplicationUserID
            };
            _context.Carts.Add(cartProduct);
            _context.SaveChanges();

            result.Result = new()
            {
                Id = cartProduct.Id,
                Status = cartProduct.Status,
                Product = null,
                ApplicationUser = null
            };
            return Ok(result);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(CartViewDto[]), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(CartViewDto[]), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateCartItems(int id)
        {
            var result = new ServiceResponse<CartViewDto>();

            var cartItem = await _context.Carts.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound("Cart item doesn't exist");
            }
            if (cartItem.Status == Status.now)
            {
                cartItem.Status = Status.later;
            }
            else
            {
                cartItem.Status = Status.now;
            }
            await _context.SaveChangesAsync();

            result.Result = new CartViewDto()
            {
                Id = cartItem.Id,
                Status = cartItem.Status,
                Product = null,
                ApplicationUser = null
            };
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(CartViewDto[]), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(CartViewDto[]), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCartItemAsync(int id)
        {
            var cartItem = await _context.Carts.FindAsync(id);
            if(cartItem == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cartItem);
            _context.SaveChanges();

            return Ok("Successfully deleted");

        }


    }
}
