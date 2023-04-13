using CartProject_1.Data;
using CartProject_1.Dto;
using CartProject_1.Models;
using CartProject_1.Types;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CartProject_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [ProducesResponseType(typeof(OrderViewDto),StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OrderViewDto),StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllOrdersAsync()
        {
            var result = new ServiceResponse<List<OrderViewDto>>();
            result.Result = await _context.Orders
                .Include(A => A.ApplicationUser)
                .Include(p => p.Product)
                .ThenInclude(c => c.Category)
                .Select(p => new OrderViewDto()
                {
                    Id = p.Id,
                    Quantity = p.Quantity,
                    Total = p.Total,
                    Status = p.Status,
                    OrderedTime = p.OrderedTime,
                    Product = new ProductViewDto()
                    {
                        Id = p.ProductId,
                        Name = p.Product.Name,
                        Description = p.Product.Description,
                        ImageUrl = p.Product.ImageUrl,
                        Price = p.Product.Price,
                        Rating = p.Product.Rating,
                        Quantity = p.Product.Quantity,
                        Category = new()
                        {
                            Id = p.Product.CategoryId,
                            Name = p.Product.Category.Name,
                            Description = p.Product.Category.Description
                        }
                    },
                    ApplicationUser = new ProfileViewDto()
                    {
                        Id = p.ApplicationUserId,
                        Name = p.ApplicationUser.Name,
                        Email = p.ApplicationUser.Email,
                        PhoneNumber = p.ApplicationUser.PhoneNumber,
                        DateOfBirth = p.ApplicationUser.DateOfBirth
                    }
                }).ToListAsync();
            if (!result.IsValid)
            {
                return NotFound(result);
            }
            return Ok(result);
        }

        [HttpGet("UserOrders")]
        [ProducesResponseType(typeof(OrderViewDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(OrderViewDto), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetOrdersByUserIdAsync(string UserId)
        {
            var result = new ServiceResponse<List<OrderViewDto>>();
            result.Result = await _context.Orders
                .Where(A => A.ApplicationUserId == UserId)
                .Include(A => A.ApplicationUser)
                .Include(p => p.Product)
                .ThenInclude(c => c.Category)
                .Select(p => new OrderViewDto()
                {
                    Id = p.Id,
                    Quantity = p.Quantity,
                    Total = p.Total,
                    Status = p.Status,
                    OrderedTime = p.OrderedTime,
                    Product = new ProductViewDto()
                    {
                        Id = p.ProductId,
                        Name = p.Product.Name,
                        Description = p.Product.Description,
                        ImageUrl = p.Product.ImageUrl,
                        Price = p.Product.Price,
                        Rating = p.Product.Rating,
                        Quantity = p.Product.Quantity,
                        Category = new()
                        {
                            Id = p.Product.CategoryId,
                            Name = p.Product.Category.Name,
                            Description = p.Product.Category.Description
                        }
                    },
                    ApplicationUser = new ProfileViewDto()
                    {
                        Id = p.ApplicationUserId,
                        Name = p.ApplicationUser.Name,
                        Email = p.ApplicationUser.Email,
                        PhoneNumber = p.ApplicationUser.PhoneNumber,
                        DateOfBirth = p.ApplicationUser.DateOfBirth
                    }
                }).ToListAsync();

            if(result == null)
            {
                return BadRequest("No item ordered yet");
            }
            return Ok(result);


        }

        [HttpPost]
        [ProducesResponseType(typeof(OrderViewDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(OrderViewDto), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateOrderAsync(OrderCreateDto dto)
        {
            var result = new ServiceResponse<OrderViewDto>();

            var order = new Order()
            {
                Quantity = dto.Quantity,
                Total = dto.Total,
                Status = OrderStatus.OntheWay,
                ProductId = dto.ProductId,
                ApplicationUserId = dto.ApplicationUserId,
                OrderedTime = DateTime.UtcNow,
            };
            _context.Orders.Add(order);
            _context.SaveChanges();

            result.Result = new()
            {
                Id = order.Id,
                Quantity = order.Quantity,
                Total = order.Total,
                Status = order.Status,
                Product = null,
                ApplicationUser = null
            };
            return Ok(result);

        }
    }
}
