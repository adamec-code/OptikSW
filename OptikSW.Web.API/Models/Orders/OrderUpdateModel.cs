using OptikSW.Domain.Modules.Customers.Entities;
using OptikSW.Domain.Modules.General.Entities;
using OptikSW.Domain.Modules.Ordes.Entities;

namespace OptikSW.Web.API.Models.Orders
{
    public class OrderUpdateModel : OrderCreateModel
    {
        public Guid Id { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public DateTime DateCreated { get; set; }

        public override Order ToEntity()
        {
            return new Order()
            {
                Id = Id,
                Prefix = Prefix,
                Number = Number,
                Customer = CustomerId != null
                ? new Customer() { Id = CustomerId.Value }
                : null,
                OrderAddress = OrderAddressId != null
                ? new Address() { Id = OrderAddressId.Value }
                : null,
                OrderStatus = OrderStatus,
                DateCreated = DateCreated,
                DateUpdated = DateTime.Now,
                Distance = Distance?.ToEntityDistance(),
                Nearby = Nearby?.ToEntityNearby(),
            };
        }
    }
}
