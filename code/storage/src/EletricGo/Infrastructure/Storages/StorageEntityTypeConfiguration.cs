using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using EletricGo.Domain.Storages;

namespace EletricGo.Infrastructure.Storages
{
    internal class LocationEntityTypeConfiguration : IEntityTypeConfiguration<Storage>
    {
        public void Configure(EntityTypeBuilder<Storage> builder)
        {

            builder.HasKey(s => s.Id);
            builder.HasOne(s => s.Location);
        }
    }
}