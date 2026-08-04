using OptikSW.Domain.Modules.Customers.Repositories;
using OptikSW.Domain.Modules.General.Repositories;
using OptikSW.Domain.Modules.Ordes.Repositories;
using OptikSW.Infrastructure.Repositories.Customers;
using OptikSW.Infrastructure.Repositories.General;
using OptikSW.Infrastructure.Repositories.Orders;

namespace OptikSW.Web.API
{
    internal static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<IAddressRepository, AddressRepository>();

            return services;
        }
    }
}
