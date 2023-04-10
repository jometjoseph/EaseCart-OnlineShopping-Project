using System.ComponentModel.DataAnnotations;

namespace CartProject_1.Dto
{
    public class CategoryCreateDto
    {
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(150)]
        public string Description { get; set; }
    }
}
