using OptikSW.Domain.Modules.Customers.Entities;

public class CustomerModel : CustomerUpdateModel
{
    public required string FullName { get; set; }
    public required string FullAddress { get; set; }
    public DateTime? DateUpdated { get; set; }

    public static CustomerModel CreateFrom(Customer entity)
    {
        return new CustomerModel()
        { 
            Id = entity.Id,
            FirstName = entity.FirstName,
            LastName = entity.LastName,
            BeforeName = entity.BeforeName,
            AfterName = entity.AfterName,
            BirthNumber = entity.BirthNumber,
            Phone = entity.Phone,
            FullName = entity.GetFullName() ?? string.Empty,
            FullAddress = entity.Address?.GetFull() ?? string.Empty,
            AddressId = entity.Address?.Id,
            DateCreated = entity.DateCreated,
            DateUpdated = entity.DateUpdated,
        };
    }
}
