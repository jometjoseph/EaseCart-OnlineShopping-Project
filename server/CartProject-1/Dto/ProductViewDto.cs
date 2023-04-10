using CartProject_1.Models;

namespace CartProject_1.Dto
{
    public class ProductViewDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public double Price { get; set; }

        public double Rating { get; set; }

        public int Quantity { get; set; }

        public CategoryViewDto Category { get; set; }
    }
}
