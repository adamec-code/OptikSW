using Microsoft.EntityFrameworkCore;
using OptikSW.Domain.Interfaces;

namespace OptikSW.Infrastructure.Repositories
{
    public class EFCrudCreatableRepository<TEntity, TContext> : IRepository<TEntity> 
        where TEntity : class, IEntityCreatable
        where TContext : DbContext
    {
        private TContext dbContext;

        protected readonly DbSet<TEntity> DbSet;

        protected TContext Context => dbContext;

        public EFCrudCreatableRepository(TContext dbContext)
        {
            this.dbContext = dbContext;
            this.DbSet = dbContext.Set<TEntity>();
        }

        public void Delete(TEntity entity)
        {
            this.DbSet.Remove(entity);
        }

        public virtual TEntity? Get(Guid id)
        {
            return DbSet.Find(id);
        }

        public virtual ICollection<TEntity> GetAll()
        {
            return DbSet
                .Where(x => x.DateDeleted == null)
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
