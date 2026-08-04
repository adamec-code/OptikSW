using OptikSW.Domain.Modules.Customers.Entities;
using OptikSW.Domain.Modules.General.Entities;
using OptikSW.Domain.Modules.Ordes.Entities;

namespace OptikSW.Web.API.Models.Orders
{
    public class OrderCreateModel
    {
        public OrderPrefix Prefix { get; set; }
        public int Number { get; set; }
        public Guid? CustomerId { get; set; }
        public Guid? OrderAddressId { get; set; }
        public OrderEyeMeasurementCreateModel? Distance { get; set; }
        public OrderEyeMeasurementCreateModel? Nearby { get; set; }

        public virtual Order ToEntity()
        {
            return new Order()
            {
                Prefix = Prefix,
                Number = Number,
                Customer = CustomerId != null
                ? new Customer() { Id = CustomerId.Value }
                : null,
                OrderAddress = OrderAddressId != null
                ? new Address() { Id = OrderAddressId.Value }
                : null,
                OrderStatus = OrderStatus.New,
                DateCreated = DateTime.Now,
                Distance = Distance?.ToEntityDistance(),
                Nearby = Nearby?.ToEntityNearby(),
            };
        }
    }
}
