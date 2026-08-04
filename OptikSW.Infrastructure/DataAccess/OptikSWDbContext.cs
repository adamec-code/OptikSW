using Microsoft.EntityFrameworkCore;
using OptikSW.Domain.Interfaces;
using System.Reflection;

namespace OptikSW.Infrastructure.DataAccess
{
    public class OptikSWDbContext : DbContext
    {

        public OptikSWDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            IEnumerable<Type> entities = typeof(IEntity).Assembly.GetTypes()
                .Where(x => !x.IsGenericType && !x.IsInterface && x.IsAssignableTo(typeof(IEntity)));

            foreach (Type entityType in entities)
            {
                modelBuilder.Entity(entityType);           }
        }
    }
}
