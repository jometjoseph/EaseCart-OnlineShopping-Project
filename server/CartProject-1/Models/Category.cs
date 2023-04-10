using System.ComponentModel.DataAnnotations;

namespace CartProject_1.Models
{
    public class Category
    {
        public int Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(150)]
        public string Description { get; set; }
    }
}
