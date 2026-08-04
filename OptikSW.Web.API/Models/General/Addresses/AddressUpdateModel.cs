using OptikSW.Domain.Modules.General.Entities;

public class AddressUpdateModel : AddressCreateModel
{
    public Guid Id { get; set; }

    public override Address ToEntity()
    {
        return new Address()
        {
            Id = Id,
            AddressLine1 = AddressLine1,
            AddressLine2 = AddressLine2,
            City = City,
            PostCode = PostCode
        };
    }
}