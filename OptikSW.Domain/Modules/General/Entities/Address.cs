using OptikSW.Domain.Interfaces;

namespace OptikSW.Domain.Modules.General.Entities
{
    public class Address : IEntity
    {
        public Guid Id { get; set; }
        public string AddressLine1 { get; set; } = string.Empty;
        public string AddressLine2 { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int PostCode { get; set; }

        public string? GetFull()
        {
            string fullAddress = AddressLine1;
            if (!string.IsNullOrWhiteSpace(AddressLine2))
            {
                fullAddress += ", " + AddressLine2;
            }
            fullAddress += ", " + City;

            return fullAddress;
        }
    }
}