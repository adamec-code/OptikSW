using OptikSW.Domain.Modules.Customers.Entities;
using OptikSW.Domain.Modules.General.Entities;

public class CustomerUpdateModel : CustomerCreateModel
{
    public Guid Id { get; set; }
    public DateTime DateCreated { get; set; }

    public override Customer ToEntity()
    {
        return new Customer()
        {
            Id = Id,
            BeforeName = BeforeName,
            FirstName = FirstName,
            LastName = LastName,
            AfterName = AfterName,
            BirthNumber = BirthNumber,
            Phone = Phone,
            Address = AddressId != null
            ? new Address() { Id = AddressId.Value }
            : null,
            DateCreated = DateCreated,
            DateUpdated = DateTime.Now,
        };
    }
}