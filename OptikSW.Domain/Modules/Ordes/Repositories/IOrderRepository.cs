using OptikSW.Domain.Interfaces;
using OptikSW.Domain.Modules.Ordes.Entities;
using OptikSW.Domain.Modules.Ordes.Filters;

namespace OptikSW.Domain.Modules.Ordes.Repositories
{
    public interface IOrderRepository : IRepository<Order>
    {
        ICollection<Order> GetAllForList(OrderFilter filter);
    }
}
