namespace CartProject_1.Dto
{
    public class CartViewDto
    {
        public int Id { get; set; }

        public ProductViewDto Product { get; set; }

        public ProfileViewDto ApplicationUser { get; set; }
    }
}
