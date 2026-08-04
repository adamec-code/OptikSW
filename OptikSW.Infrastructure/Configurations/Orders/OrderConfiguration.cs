using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OptikSW.Domain.Modules.Ordes.Entities;

namespace OptikSW.Infrastructure.Configurations.Orders
{
    internal class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasOne(x => x.Nearby).WithOne(x => x.Order);
            builder.HasOne(x => x.Distance).WithOne(x => x.Order);
        }
    }
}
