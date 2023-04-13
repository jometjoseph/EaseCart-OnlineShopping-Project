using CartProject_1.Types;

namespace CartProject_1.Dto
{
    public class CartCreateDto
    {
        public Status Status { get; set; }

        public int ProductId { get; set; }

        public string ApplicationUserID { get; set; }
    }
}
