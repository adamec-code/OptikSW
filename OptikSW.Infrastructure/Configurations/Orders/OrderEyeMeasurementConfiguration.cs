using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OptikSW.Domain.Modules.Ordes.Entities;

namespace OptikSW.Infrastructure.Configurations.Orders
{
    internal class OrderEyeMeasurementConfiguration : IEntityTypeConfiguration<OrderEyeMeasurement>
    {
        public void Configure(EntityTypeBuilder<OrderEyeMeasurement> builder)
        {
            builder.OwnsOne(x => x.RightEye).Property(x => x.Sphere).HasPrecision(4, 2);
            builder.OwnsOne(x => x.RightEye).Property(x => x.Cylinder).HasPrecision(4, 2);

            builder.OwnsOne(x => x.LeftEye).Property(x => x.Sphere).HasPrecision(4, 2);
            builder.OwnsOne(x => x.LeftEye).Property(x => x.Cylinder).HasPrecision(4, 2);

            builder.Property(x => x.LayerPrice).HasPrecision(10,2);
            builder.Property(x => x.FramesPrice).HasPrecision(10, 2);
            builder.Property(x => x.Price).HasPrecision(10, 2);
        }
    }
}
