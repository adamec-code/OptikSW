using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using OptikSW.Domain.Modules.Customers.Entities;
using OptikSW.Domain.Modules.Customers.Repositories;
using OptikSW.Infrastructure.DataAccess;

namespace OptikSW.Infrastructure.Repositories.Customers
{
    public class CustomerRepository : EFCrudCreatableRepository<Customer, OptikSWDbContext>, ICustomerRepository
    {
        public CustomerRepository(OptikSWDbContext dbContext) : base(dbContext)
        {
        }

        public override ICollection<Customer> GetAll()
        {
            return DbSet
                .Include(x => x.Address)
                .Where(x => x.DateDeleted == null)
                .ToList();
        }

        public override Customer? Get(Guid id)
        {
            return DbSet
                .Include(x => x.Address)
                .Where(x => x.Id == id) 
                .FirstOrDefault();
        }
    }
}
