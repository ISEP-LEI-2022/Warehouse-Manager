using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using EletricGo.Domain.Storages;

namespace EletricGo.Infrastructure.Storages
{
    internal class StorageEntityTypeConfiguration : IEntityTypeConfiguration<Storage>
    {
        public void Configure(EntityTypeBuilder<Storage> builder)
        {

            //builder.ToTable("Storages", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.HasOne(b => b.Location);
        }
    }
}