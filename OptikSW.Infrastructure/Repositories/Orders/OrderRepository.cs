using Microsoft.EntityFrameworkCore;
using OptikSW.Core;
using OptikSW.Domain.Modules.Customers.Entities;
using OptikSW.Domain.Modules.Ordes.Entities;
using OptikSW.Domain.Modules.Ordes.Filters;
using OptikSW.Domain.Modules.Ordes.Repositories;
using OptikSW.Infrastructure.DataAccess;

namespace OptikSW.Infrastructure.Repositories.Orders
{
    public class OrderRepository : EFCrudCreatableRepository<Order, OptikSWDbContext>, IOrderRepository
    {
        public OrderRepository(OptikSWDbContext dbContext) : base(dbContext)
        {
        }

        public ICollection<Order> GetAllForList(OrderFilter filter)
        {
            string fulltext = filter.Fulltext ?? string.Empty;
            string birthNumber = filter.BirthNumber ?? string.Empty;

            return this.DbSet
                .Include(x => x.OrderAddress)
                .Include(x => x.Customer)
                .Include(x => x.Distance)
                .Include(x => x.Nearby)
                .WhereIfNotEmpty(x => (x.Prefix.ToString() + x.Number).Contains(fulltext) || (x.Customer == null || x.Customer.FirstName.Contains(fulltext) || x.Customer.LastName.Contains(fulltext)), fulltext)
                .WhereIfNotEmpty(x => x.Customer != null && x.Customer.BirthNumber.Contains(birthNumber), birthNumber)
                .ToList();
        }

        public override Order? Get(Guid id)
        {
            return DbSet
                .Include(x => x.OrderAddress)
                .Include(x => x.Customer)
                .Include(x => x.Distance)
                .Include(x => x.Nearby)
                .Where(x => x.Id == id)
                .FirstOrDefault();
        }
    }
}
