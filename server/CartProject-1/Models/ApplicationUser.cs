﻿using Microsoft.AspNetCore.Identity;

namespace CartProject_1.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }

        public DateTime DateOfBirth { get; set; }

    }
}
