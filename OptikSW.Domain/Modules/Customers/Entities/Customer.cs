using OptikSW.Domain.Interfaces;
using OptikSW.Domain.Modules.General.Entities;

namespace OptikSW.Domain.Modules.Customers.Entities;

public class Customer : IEntityCreatable
{
    public Guid Id { get; set; }
    public string BeforeName { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string AfterName { get; set; } = string.Empty;
    public string BirthNumber { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public Address? Address { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.Now;
    public DateTime? DateUpdated { get; set; }
    public DateTime? DateDeleted { get; set; }

    public string? GetFullName()
    {
        return LastName + " " + FirstName;
    }
}
