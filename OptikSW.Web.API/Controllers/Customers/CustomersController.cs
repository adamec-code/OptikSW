using Microsoft.AspNetCore.Mvc;
using OptikSW.Domain.Modules.Customers.Entities;
using OptikSW.Domain.Modules.Customers.Repositories;
using OptikSW.Domain.Modules.General.Repositories;
using System.Net;

namespace OptikSW.Web.API.Controllers.Customers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomersController : Controller
    {
        private readonly ICustomerRepository customerRepository;
        private readonly IAddressRepository addressRepository;

        public CustomersController(ICustomerRepository customerRepository, IAddressRepository addressRepository)
        {
            this.customerRepository = customerRepository;
            this.addressRepository = addressRepository;
        }

        [HttpGet]
        public IEnumerable<CustomerModel> List()
        {
            return customerRepository.GetAll()
                .Select(CustomerModel.CreateFrom)
                .ToList();
        }

        [HttpGet("{id:Guid}")]
        [ProducesResponseType(typeof(CustomerModel), (int)HttpStatusCode.OK)]
        public IActionResult Get(Guid id)
        {
            var customer = customerRepository.Get(id);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(CustomerModel.CreateFrom(customer));
        }

        [HttpPost]
        public IActionResult Insert(CustomerCreateModel model)
        {
            var customer = model.ToEntity();
            if (model.AddressId != null)
            {
                var address = addressRepository.Get(model.AddressId.Value);
                customer.Address = address;
            }
            customerRepository.Insert(customer);
            customerRepository.SaveChanges();

            return Ok(CustomerModel.CreateFrom(customer));
        }

        [HttpPut]
        public IActionResult Update(CustomerUpdateModel model)
        {
            var customer = model.ToEntity();
            customerRepository.Update(customer);
            customerRepository.SaveChanges();

            return Ok(CustomerModel.CreateFrom(customer));
        }

        [HttpDelete("{id:Guid}")]
        public void Delete(Guid id)
        {
            var customer = customerRepository.Get(id);

            if (customer != null)
            {
                customer.DateDeleted = DateTime.Now;
                customerRepository.Update(customer);
                customerRepository.SaveChanges();
            }
        }
    }
}
