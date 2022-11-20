using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using EletricGo.Domain.Deliveries;
using Microsoft.Extensions.Hosting;
using System.Reflection.Emit;
using System.Reflection;

namespace EletricGo.Infrastructure.Products
{
    internal class ProductEntityTypeConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {

            Console.WriteLine("Product");
            builder.HasKey(p => p.Id);
            builder.HasOne(p => p.Delivery).WithMany(d => d.Products).HasForeignKey(p => p.DeliveryId);


        }
    }
}