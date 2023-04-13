using CartProject_1.Types;

namespace CartProject_1.Dto
{
    public class OrderViewDto
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public float Total { get; set; }

        public OrderStatus Status { get; set; }

        public ProductViewDto Product { get; set; }

        public ProfileViewDto ApplicationUser { get; set; }

        public DateTime OrderedTime { get; set; }
    }
}
