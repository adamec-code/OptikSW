using OptikSW.Domain.Interfaces;

namespace OptikSW.Domain.Modules.Ordes.Entities
{
    public abstract class OrderEyeMeasurement : IEntity
    {
        public Guid Id { get; set; }
        public Order? Order { get; set; } = null!;
        public required EyeMeasurement RightEye { get; set; }
        public required EyeMeasurement LeftEye { get; set; }
        public EyeMeasurementType Type { get; set; }
        public string? Layer { get; set; }
        public decimal? LayerPrice { get; set; }
        public string? Frames { get; set; }
        public decimal? FramesPrice { get; set; }
        public decimal Price { get; set; } = decimal.Zero;
    }

    public class OrderEyeMeasurementDistance : OrderEyeMeasurement
    {
        public OrderEyeMeasurementDistance()
        {
            Type = EyeMeasurementType.Distance;
        }
    }

    public class OrderEyeMeasurementNearby : OrderEyeMeasurement
    {
        public OrderEyeMeasurementNearby()
        {
            Type = EyeMeasurementType.Nearby;
        }
    }
}
