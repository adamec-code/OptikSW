using Microsoft.EntityFrameworkCore;

namespace OptikSW.Infrastructure.DataAccess
{
    public class OptikSWDbContext : DbContext
    {
        public OptikSWDbContext(DbContextOptions options) : base(options)
        {
        }

        protected OptikSWDbContext()
        {
        }

    }
}
