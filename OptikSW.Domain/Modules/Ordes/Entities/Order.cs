using OptikSW.Domain.Interfaces;
using OptikSW.Domain.Modules.Customers.Entities;
using OptikSW.Domain.Modules.General.Entities;

namespace OptikSW.Domain.Modules.Ordes.Entities
{
    public class Order : IEntityCreatable
    {
        public Guid Id { get; set; }
        public OrderPrefix Prefix { get; set; }
        public int Number { get; set; }
        public Customer? Customer { get; set; }
        public Address? OrderAddress { get; set; }
        public Guid? DistanceId { get; set; }
        public OrderEyeMeasurementDistance? Distance { get; set; }
        public Guid? NearbyId { get; set; }
        public OrderEyeMeasurementNearby? Nearby { get; set; }
        // TODO:
        //public Lenses? Lenses { get; set; }
        //public Repairs? Repairs { get; set; }
        //public ICollection<LenseLayout> { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime? DateUpdated { get; set; }
        public DateTime? DateDeleted { get; set; }
    }
}