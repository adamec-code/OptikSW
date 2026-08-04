using Microsoft.EntityFrameworkCore;
using OptikSW.Domain.Interfaces;

namespace OptikSW.Infrastructure.Repositories
{
    public class EFCrudRepository<TEntity, TContext> : IRepository<TEntity> 
        where TEntity : class, IEntity
        where TContext : DbContext
    {
        private TContext dbContext;

        protected readonly DbSet<TEntity> DbSet;

        protected TContext Context => dbContext;

        public EFCrudRepository(TContext dbContext)
        {
            this.dbContext = dbContext;
            this.DbSet = dbContext.Set<TEntity>();
        }

        public void Delete(TEntity entity)
        {
            this.DbSet.Remove(entity);
        }

        public TEntity? Get(Guid id)
        {
            return DbSet.Find(id);
        }

        public ICollection<TEntity> GetAll()
        {
            return DbSet
                .ToList();
        }

        public void Insert(TEntity entity)
        {
            DbSet.Add(entity);
        }

        public void Update(TEntity entity)
        {
            DbSet.Update(entity);
        }

        public void SaveChanges()
        {
            dbContext.SaveChanges();
        }
    }
}
