using OptikSW.Domain.Modules.Ordes.Entities;

namespace OptikSW.Web.API.Models.Orders
{
    public class OrderModel : OrderUpdateModel
    {
        public required string CustomerFullName { get; set; }
        public required string CustomerCity { get; set; }
        public required string OrderAddressFull { get; set; }
        public DateTime? DateUpdated { get; set; }

        public static OrderModel CreateFrom(Order entity)
        { 
            return new OrderModel()
            { 
                Id = entity.Id,
                Prefix = entity.Prefix,
                Number = entity.Number,
                CustomerId = entity.Customer?.Id,
                CustomerFullName = entity.Customer?.GetFullName() ?? string.Empty,
                CustomerCity = entity.Customer?.Address?.City ?? string.Empty,
                OrderAddressId = entity.OrderAddress?.Id,
                OrderAddressFull = entity.OrderAddress?.GetFull() ?? string.Empty,
                Distance = OrderEyeMeasurementModel.CreateFrom(entity.Distance!),
                Nearby = OrderEyeMeasurementModel.CreateFrom(entity.Nearby!),
                OrderStatus = entity.OrderStatus,
                DateCreated = entity.DateCreated,
                DateUpdated = entity.DateUpdated,
            };
        }
    }
}
