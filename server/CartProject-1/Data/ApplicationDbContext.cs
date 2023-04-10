using CartProject_1.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CartProject_1.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> Options)
           : base(Options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Id = "c1c3df32-fc04-44e5-82ec-496b16bd060b", ConcurrencyStamp = "c1c3df32-fc04-44e5-82ec-496b16bd060b", Name = "Admin", NormalizedName = "Admin" },
                new IdentityRole { Id = "c1c3df32-fc04-44e5-82ec-496b16bd060c", ConcurrencyStamp = "c1c3df32-fc04-44e5-82ec-496b16bd060c", Name = "User", NormalizedName = "USER" }
                );
        }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get;set; }

        public DbSet<Cart> Carts { get; set; }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    }
}
