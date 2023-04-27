using CartProject_1.Data;
using CartProject_1.Dto;
using CartProject_1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CartProject_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public CategoryController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        [ProducesResponseType(typeof(CategoryViewDto[]), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(CategoryViewDto[]), StatusCodes.Status400BadRequest)]
        public async Task<List<CategoryViewDto>> GetAllCategoriesAsync()
        {
            return await _db.Categories
                .Select(c => new CategoryViewDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description
                }).ToListAsync();
        }

        [HttpPost]
        [ProducesResponseType(typeof(CategoryViewDto[]), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(CategoryViewDto[]), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateCategoryAsync(CategoryCreateDto dto)
        {
            if(dto.Name == "string" || dto.Description == "string")
            {
                return BadRequest("Invalid values");
            }
            var category = new Category
            {
                Name = dto.Name,
                Description = dto.Description
            };
             _db.Categories.Add(category);
            _db.SaveChanges();

            return Ok(new CategoryViewDto
            {
                Id = category.Id,
                Name = category.Name,
            });
        }

        [HttpDelete]
        [ProducesResponseType(typeof(CategoryViewDto[]), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(CategoryViewDto[]), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteCategoryAsync(int id)
        {
            var category = await _db.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            _db.Categories.Remove(category);
            await _db.SaveChangesAsync();
            return Ok("Successfully deleted");
        }

    }
}
