using OptikSW.Domain.Modules.Ordes.Entities;

namespace OptikSW.Web.API.Models.Orders
{
    public class OrderEyeMeasurementModel : OrderEyeMeasurementCreateModel
    {
        public Guid Id { get; set; }

        public static new OrderEyeMeasurementModel? CreateFrom(OrderEyeMeasurement entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new OrderEyeMeasurementModel()
            {
                Id = entity.Id,
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
    }
}
