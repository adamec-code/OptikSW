using Microsoft.Identity.Client;
using OptikSW.Domain.Modules.General.Entities;
using OptikSW.Domain.Modules.General.Repositories;
using OptikSW.Domain.Modules.Ordes.Entities;
using OptikSW.Domain.Modules.Ordes.Filters;
using OptikSW.Infrastructure.DataAccess;

namespace OptikSW.Infrastructure.Repositories.General
{
    public class AddressRepository : EFCrudRepository<Address, OptikSWDbContext>, IAddressRepository
    {
        public AddressRepository(OptikSWDbContext dbContext) 
            : base(dbContext)
        {
        }
    }
}
