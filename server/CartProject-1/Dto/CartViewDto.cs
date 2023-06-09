﻿using CartProject_1.Types;

namespace CartProject_1.Dto
{
    public class CartViewDto
    {
        public int Id { get; set; }

        public Status Status { get; set; }

        public ProductViewDto Product { get; set; }

        public ProfileViewDto ApplicationUser { get; set; }
    }
}
