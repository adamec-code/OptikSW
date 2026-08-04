using OptikSW.Domain.Modules.General.Entities;

public class AddressCreateModel
{
    public required string AddressLine1 { get; set; }
    public required string AddressLine2 { get; set; }
    public required string City { get; set; }
    public int PostCode { get; set; }

    public virtual Address ToEntity()
    {
        return new Address()
        {
            AddressLine1 = AddressLine1,
            AddressLine2 = AddressLine2,
            City = City,
            PostCode = PostCode
        };
    }
}