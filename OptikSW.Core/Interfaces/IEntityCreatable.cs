namespace OptikSW.Domain.Interfaces
{
    public interface IEntityCreatable : IEntity
    {
        DateTime DateCreated { get; set; }
        DateTime? DateUpdated { get; set; }
        DateTime? DateDeleted { get; set; }
    }
}