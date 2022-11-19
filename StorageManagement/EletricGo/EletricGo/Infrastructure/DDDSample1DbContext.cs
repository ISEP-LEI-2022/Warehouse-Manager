using EletricGo.Domain.Deliveries;
using EletricGo.Domain.Storages;
using EletricGo.Infrastructure.Storages;
using Microsoft.EntityFrameworkCore;


namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {
        public DbSet<Storage> Storages { get; set; }
        public DbSet<Delivery> Deliveries { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new StorageEntityTypeConfiguration());

        }
    }
}