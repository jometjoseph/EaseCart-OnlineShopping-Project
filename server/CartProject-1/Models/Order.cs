using CartProject_1.Types;

namespace CartProject_1.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public float Total { get; set; }

        public OrderStatus Status { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public DateTime OrderedTime { get; set; }
    }
}
