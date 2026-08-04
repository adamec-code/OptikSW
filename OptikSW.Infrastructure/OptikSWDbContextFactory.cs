using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using OptikSW.Infrastructure.DataAccess;
using Microsoft.Extensions.Configuration;

namespace OptikSW.Infrastructure
{
    public class OptikSWDbContextFactory : IDesignTimeDbContextFactory<OptikSWDbContext>
    {

        OptikSWDbContext IDesignTimeDbContextFactory<OptikSWDbContext>.CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath( Directory.GetParent(Directory.GetCurrentDirectory())+"/OptikSW.Web.API")
                .AddJsonFile("appsettings.json")
                .Build();

            var builder = new DbContextOptionsBuilder<OptikSWDbContext>();
            var connectionString = configuration.GetConnectionString("connection");

            builder.UseSqlServer(connectionString);

            return new OptikSWDbContext(builder.Options);
        }
    }
}
