using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using EletricGo.Domain.Deliveries;

namespace EletricGo.Infrastructure.Deliveries
{
    internal class DeliveryEntityTypeConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {
            //builder.ToTable("Storages", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
        }
    }
}