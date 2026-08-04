using OptikSW.Domain.Modules.Ordes.Entities;

namespace OptikSW.Web.API.Models.Orders
{
    public class OrderEyeMeasurementCreateModel
    {
        public required EyeMeasurement RightEye { get; set; }
        public required EyeMeasurement LeftEye { get; set; }
        public EyeMeasurementType Type { get; set; }
        public string? Layer { get; set; }
        public decimal? LayerPrice { get; set; }
        public string? Frames { get; set; }
        public decimal? FramesPrice { get; set; }
        public decimal Price { get; set; } = decimal.Zero;

        public static OrderEyeMeasurementCreateModel? CreateFrom(OrderEyeMeasurement entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new OrderEyeMeasurementCreateModel()
            {
                RightEye = entity.RightEye,
                LeftEye = entity.LeftEye,
                Type = entity.Type,
                Layer = entity.Layer,
                LayerPrice = entity.LayerPrice,
                Frames = entity.Frames,
                FramesPrice = entity.FramesPrice,
                Price = entity.Price,
            };
        }

        internal OrderEyeMeasurementDistance ToEntityDistance()
        {
            return new OrderEyeMeasurementDistance()
            {
                RightEye = RightEye,
                LeftEye = LeftEye,
                Layer = Layer,
                LayerPrice = LayerPrice,
                Frames = Frames,
                FramesPrice = FramesPrice,
                Price = Price,
            };
        }

        internal OrderEyeMeasurementNearby ToEntityNearby()
        {
            return new OrderEyeMeasurementNearby()
            {
                RightEye = RightEye,
                LeftEye = LeftEye,
                Layer = Layer,
                LayerPrice = LayerPrice,
                Frames = Frames,
                FramesPrice = FramesPrice,
                Price = Price,
            };
        }
    }
}
