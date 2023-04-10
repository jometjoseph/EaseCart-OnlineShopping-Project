using System.ComponentModel.DataAnnotations;

namespace CartProject_1.Models
{
    public class Product
    {
        public int Id { get; set; }

        [StringLength(250)]
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public double Price { get; set; }

        public double Rating { get; set; }

        public int Quantity { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }
    }
}
