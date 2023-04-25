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
    public class ProductController : ControllerBase
    {
        private ApplicationDbContext _context;
        public ProductController(ApplicationDbContext context)
        {
            _context = context;

        }

        [HttpGet]
        [ProducesResponseType(typeof(ProductViewDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProductViewDto), StatusCodes.Status400BadRequest)]
        public async Task<List<ProductViewDto>> GetAllProductsAsync()
        {
            return await _context.Products
                .Select(p => new ProductViewDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Category = new CategoryViewDto()
                    {
                        Id = p.CategoryId,
                        Name = p.Category.Name,
                        Description = p.Category.Description,
                    },
                    ImageUrl = p.ImageUrl,
                    Price = p.Price,
                    Rating = p.Rating,
                    Quantity = p.Quantity
                }).ToListAsync();
        }

        [HttpGet("ProductById/{id}")]
        [ProducesResponseType(typeof(ProductViewDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProductViewDto), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetProductByIdAsync(int id)
        {
            var result = await _context.Products
                .Include(c => c.Category).FirstOrDefaultAsync(p => p.Id == id);

            if(result is null)
            {
                return NotFound("Product doesn't exist");
            }

            ServiceResponse<ProductViewDto> product = new()
            {
               Result = new()
               {
                   Id = result.Id,
                   Name = result.Name,
                   Description = result.Description,
                   Category = new CategoryViewDto()
                   {
                       Id = result.Category.Id,
                       Name = result.Category.Name,
                       Description = result.Category.Description,
                   },
                   ImageUrl = result.ImageUrl,
                   Price = result.Price,
                   Rating = result.Rating,
                   Quantity = result.Quantity
               }
            };

            return Ok(product);

        }

        [HttpGet("ProductByCategoryId/{id}")]
        [ProducesResponseType(typeof(ProductViewDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProductViewDto), StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetProductByCategoryIdAsync(int id)
        {
            var result = new List<ProductViewDto>();
            result = await _context.Products
                .Where(p => p.CategoryId == id)
                .Include(c => c.Category)
                .Select(s => new ProductViewDto()
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    ImageUrl= s.ImageUrl,
                    Price = s.Price,
                    Rating = s.Rating,
                    Quantity = s.Quantity,
                    Category = new()
                    {
                        Id = s.Category.Id,
                        Name = s.Category.Name,
                        Description = s.Category.Description,
                    }
                }).ToListAsync();

            if(result.Count < 1 )
            {
                return NotFound("No products in this category");
            }

            return Ok(result);
        }


        [HttpPost]
        [ProducesResponseType(typeof(ProductCreateDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ProductCreateDto), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateProductAsync(ProductCreateDto dto)
        {
            var result = new ServiceResponse<ProductViewDto>();

            if (!await _context.Categories.AnyAsync(m => m.Id == dto.CategoryId))
                result.AddError("error", "Invalid category");

            if (await _context.Products.AnyAsync(m => m.Name == dto.Name))
                result.AddError("error", "A similar product already exists.");

            if (!result.IsValid)
                return BadRequest(result.Errors);

            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                CategoryId = dto.CategoryId,
                ImageUrl = dto.ImageUrl,
                Price = dto.Price,
                Rating = dto.Rating,
                Quantity = dto.Quantity
            };
            _context.Products.Add(product);
            _context.SaveChanges();

            result.Result = new()
            {
                Name = product.Name,
                Description = product.Description,
                ImageUrl = product.ImageUrl,
                Price = product.Price,
                Rating = product.Rating,
                Quantity = product.Quantity
            };
            return Ok(result);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ProductViewDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProductViewDto), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateProductAsync(int id, ProductCreateDto dto)
        {
            var result = new ServiceResponse<ProductViewDto>();

            var product = await _context.Products.FindAsync(id);
            if(product == null)
            {
                result.AddError("ProductId", "Product doesn't exist");
                return BadRequest(result);
            }

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.ImageUrl = dto.ImageUrl;
            product.Price = dto.Price;
            product.Rating = dto.Rating;
            product.Quantity = dto.Quantity;
            product.CategoryId = dto.CategoryId;

            await _context.SaveChangesAsync();

            result.Result = new ProductViewDto()
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                ImageUrl = product.ImageUrl,
                Price = product.Price,
                Rating = product.Rating,
                Quantity = product.Quantity,
                Category = null
            };
            return Ok(result);
                
        }


        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ProductCreateDto), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProductCreateDto), StatusCodes.Status404NotFound)]
        public async Task<ServiceResponse<bool>> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return null;
            }

            _context.Products.Remove(product);
            _context.SaveChanges();
            return new ServiceResponse<bool>
            {
                Result = true
            };
        }

    }
}
