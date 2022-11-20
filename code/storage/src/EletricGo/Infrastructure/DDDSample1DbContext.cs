using EletricGo.Domain.Deliveries;
using EletricGo.Domain.Storages;
using EletricGo.Infrastructure.Storages;
using Microsoft.EntityFrameworkCore;


namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {
        public DbSet<Storage> Storage { get; set; }
        public DbSet<Delivery> Delivery { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<City> City { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<ChargingSystem> ChargingSystem { get; set; }
        public DbSet<Product> Product { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new LocationEntityTypeConfiguration());

        }
    }
}