using Microsoft.AspNetCore.Mvc;
using OptikSW.Domain.Modules.General.Repositories;
using OptikSW.Web.API.Models.General.Addresses;
using System.Net;

namespace OptikSW.Web.API.Controllers.General
{
    [ApiController]
    [Route("[controller]")]
    public class AddressesController : Controller
    {
        private readonly IAddressRepository addressRepository;

        public AddressesController(IAddressRepository addressRepository)
        {
            this.addressRepository = addressRepository;
        }

        [HttpGet]
        public IEnumerable<AddressModel> List()
        {
            return addressRepository.GetAll()
                .Select(AddressModel.CreateFrom)
                .ToList();
        }

        [HttpGet("{id:Guid}")]
        [ProducesResponseType(typeof(AddressModel), (int)HttpStatusCode.OK)]
        public IActionResult Get(Guid id)
        {
            var address = addressRepository.Get(id);
            if (address == null)
            {
                return NotFound();
            }

            return Ok(AddressModel.CreateFrom(address));
        }

        [HttpPost]
        public IActionResult Insert(AddressCreateModel model)
        {
            var address = model.ToEntity();
            addressRepository.Insert(address);
            addressRepository.SaveChanges();

            return Ok(AddressModel.CreateFrom(address));
        }

        [HttpPut]
        public IActionResult Update(AddressUpdateModel model)
        {
            var address = model.ToEntity();
            addressRepository.Update(address);
            addressRepository.SaveChanges();

            return Ok(AddressModel.CreateFrom(address));
        }

        [HttpDelete("{id:Guid}")]
        public void Delete(Guid id)
        {
            var address = addressRepository.Get(id);

            if (address != null)
            {
                addressRepository.Delete(address); // hard delete
                addressRepository.SaveChanges();
            }
        }
    }
}
