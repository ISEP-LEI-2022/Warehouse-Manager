using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using EletricGo.Domain.Deliveries;
using Microsoft.Extensions.Hosting;
using System.Reflection.Emit;
using System.Reflection;

namespace EletricGo.Infrastructure.Deliveries
{
    internal class ProductEntityTypeConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {

            Console.WriteLine("Delivery");
            builder.HasKey(d => d.Id);
            builder.HasOne(d => d.FinalStorage).WithMany(s => s.Deliveries).HasForeignKey(d => d.FinalStorageId);

        }
    }
}