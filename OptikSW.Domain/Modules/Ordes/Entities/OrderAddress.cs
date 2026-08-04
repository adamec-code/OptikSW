using OptikSW.Domain.Interfaces;
using OptikSW.Domain.Modules.General.Entities;

namespace OptikSW.Domain.Modules.Ordes.Entities
{
    public class OrderAddress : IEntity
    {
        public Guid Id { get; set; }
        public Address? Address { get; set; }
        public string AddressLine1 { get; set; } = string.Empty;
        public string AddressLine2 { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int PostCode { get; set; }
    }
}
