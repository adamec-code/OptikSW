using OptikSW.Domain.Modules.General.Entities;

namespace OptikSW.Web.API.Models.General.Addresses
{
    public class AddressModel : AddressUpdateModel
    {
        public static AddressModel CreateFrom(Address entity)
        {
            return new AddressModel()
            {
                Id = entity.Id,
                AddressLine1 = entity.AddressLine1,
                AddressLine2 = entity.AddressLine2,
                City = entity.City,
                PostCode = entity.PostCode
            };
        }
    }
}