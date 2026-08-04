using OptikSW.Domain.Modules.Customers.Entities;
using OptikSW.Domain.Modules.General.Entities;

public class CustomerCreateModel
{
    public string BeforeName { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string AfterName { get; set; } = string.Empty;
    public string BirthNumber { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public Guid? AddressId { get; set; }

    public virtual Customer ToEntity()
    {
        return new Customer()
        {
            BeforeName = BeforeName,
            FirstName = FirstName,
            LastName = LastName,
            AfterName = AfterName,
            BirthNumber = BirthNumber,
            Phone = Phone,
            Address = AddressId != null
            ? new Address() { Id = AddressId.Value } 
            : null,
        };
    }
}