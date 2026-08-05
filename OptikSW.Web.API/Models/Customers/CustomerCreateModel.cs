using OptikSW.Domain.Modules.Customers.Entities;
using OptikSW.Domain.Modules.General.Entities;
using System.ComponentModel.DataAnnotations;

public class CustomerCreateModel
{
    [MaxLength(20, ErrorMessage = "Titul je příliš dlouhý")]
    public string BeforeName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Jméno je povinné pole")]
    [MaxLength(100, ErrorMessage = "Jméno je příliš dlouhé")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Příjmení je povinné pole")]
    [MaxLength(100, ErrorMessage = "Příjmení je příliš dlouhé")]
    public string LastName { get; set; } = string.Empty;

    [MaxLength(20, ErrorMessage = "Titul je příliš dlouhý")]
    public string AfterName { get; set; } = string.Empty;

    [MaxLength(20, ErrorMessage = "Hodnota je příliš dlouhá")]
    public string BirthNumber { get; set; } = string.Empty;

    [MaxLength(20, ErrorMessage = "Telefon je příliš dlouhý")]
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