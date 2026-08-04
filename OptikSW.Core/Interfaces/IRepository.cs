namespace OptikSW.Domain.Interfaces
{
    public interface IRepository<T> where T : IEntity
    {
        void Insert(T entity);

        void Update(T entity);

        void Delete(T entity);

        void SaveChanges();

        T? Get(Guid id);

        ICollection<T> GetAll();
    }
}
