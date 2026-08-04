using Microsoft.AspNetCore.Mvc;
using OptikSW.Domain.Modules.Customers.Entities;
using OptikSW.Domain.Modules.Customers.Repositories;
using OptikSW.Domain.Modules.General.Repositories;
using OptikSW.Domain.Modules.Ordes.Entities;
using OptikSW.Domain.Modules.Ordes.Filters;
using OptikSW.Domain.Modules.Ordes.Repositories;
using OptikSW.Infrastructure.Repositories.General;
using OptikSW.Web.API.Models.Orders;
using System.Net;

namespace OptikSW.Web.React.Server.Controllers.Orders
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly ICustomerRepository customerRepository;
        private readonly IAddressRepository addressRepository;
        private readonly IOrderRepository orderRepository;

        public OrdersController(
            ILogger<OrdersController> logger, 
            ICustomerRepository customerRepository,
            IAddressRepository addressRepository,
            IOrderRepository orderRepository
        )
        {
            _logger = logger;
            this.customerRepository = customerRepository;
            this.addressRepository = addressRepository;
            this.orderRepository = orderRepository;
        }

        [HttpGet("/orders/")]
        public IEnumerable<OrderModel> List([FromQuery] OrderFilter filter)
        {
            return orderRepository.GetAllForList(filter)
                .Select(OrderModel.CreateFrom)
                .ToList();
        }

        [HttpGet("/orders/{id:Guid}")]
        [ProducesResponseType(typeof(OrderModel), (int)HttpStatusCode.OK)]
        public IActionResult Get(Guid id)
        {
            var order = orderRepository.Get(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(OrderModel.CreateFrom(order));
        }

        [HttpPost("/orders/")]
        public IActionResult Insert(OrderCreateModel model)
        {
            var order = model.ToEntity();
            if (model.CustomerId != null)
            {
                var customer = customerRepository.Get(model.CustomerId.Value);
                order.Customer = customer;
            }
            if (model.OrderAddressId != null)
            {
                var address = addressRepository.Get(model.OrderAddressId.Value);
                order.OrderAddress = address;
            }
            orderRepository.Insert(order);
            orderRepository.SaveChanges();

            return Ok(OrderModel.CreateFrom(order));
        }

        [HttpPut("/orders/")]
        public IActionResult Update(OrderUpdateModel model)
        {
            var order = model.ToEntity();

            orderRepository.Update(order);
            orderRepository.SaveChanges();

            return Ok(OrderModel.CreateFrom(order));
        }

        [HttpDelete("/orders/{id:Guid}")]
        public void Delete(Guid id)
        {
            var order = orderRepository.Get(id);

            if (order != null)
            {
                order.DateDeleted = DateTime.Now;
                orderRepository.Update(order);
                orderRepository.SaveChanges();
            }
        }
    }
}
