using Microsoft.EntityFrameworkCore;
using OptikSW.Domain.Modules.Ordes.Entities;
using OptikSW.Domain.Modules.Ordes.Repositories;
using OptikSW.Infrastructure.DataAccess;

namespace OptikSW.Infrastructure.Repositories.Orders
{
    public class OrderRepository : EFCrudRepository<Order, OptikSWDbContext>, IOrderRepository
    {
        public OrderRepository(OptikSWDbContext dbContext) : base(dbContext)
        {
        }
    }
}
