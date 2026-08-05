using OptikSW.Domain.Modules.General.Entities;
using System.ComponentModel.DataAnnotations;

public class AddressCreateModel
{
    [Required(ErrorMessage = "Adresa (ulice, č.p.) je povinné pole")]
    [MaxLength(200, ErrorMessage = "Adresa je příliš dlouhá")]
    public required string AddressLine1 { get; set; }

    [MaxLength(200, ErrorMessage = "Doplňující údaje jsou příliš dlouhé")]
    public required string AddressLine2 { get; set; }

    [Required(ErrorMessage = "Město je povinné pole")]
    [MaxLength(100, ErrorMessage = "Město je příliš dlouhé")]
    public required string City { get; set; }

    [Range(10000, 99999, ErrorMessage = "PSČ musí být v rozsahu 10000 až 99999")]
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