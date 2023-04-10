namespace CartProject_1.Dto
{
    public class ProductCreateDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }

        public string ImageUrl { get; set; }

        public double Price { get; set; }

        public double Rating { get; set; }

        public int Quantity { get; set; }
    }
}
