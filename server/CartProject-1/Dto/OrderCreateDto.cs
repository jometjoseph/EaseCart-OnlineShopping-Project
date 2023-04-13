using CartProject_1.Types;

namespace CartProject_1.Dto
{
    public class OrderCreateDto
    {
        public int Quantity { get; set; }

        public float Total { get; set; }

        public OrderStatus Status { get; set; }

        public DateTime OrderedTime { get; set; }

        public int ProductId { get; set; }

        public string ApplicationUserId { get; set; }
    }
}
