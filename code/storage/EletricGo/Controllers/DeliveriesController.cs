using EletricGo.Domain.Shared;
using EletricGo.Domain.Deliveries;
using Microsoft.AspNetCore.Mvc;
using EletricGo.Domain.Storages;

namespace EletricGo.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class DeliveriesController : ControllerBase
    {
        private readonly DeliveryService _service;

        public DeliveriesController(DeliveryService service)
        {
            _service = service;
        }

        // GET: api/Deliveries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Deliveries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryDto>> GetGetById(Guid id)
        {
            var delivery = await _service.GetByIdAsync(new DeliveryId(id));

            if (delivery == null)
            {
                return NotFound();
            }
            return delivery;
        }



        // POST: api/Deliveries/
        [HttpPost]
        public async Task<ActionResult<DeliveryDto>> Create(CreatingDeliveryDto dto)
        {
            try
            {
                var delivery = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = delivery.Id }, delivery);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // PUT: api/Deliveries/5
        [HttpPut("{id}")]
        public async Task<ActionResult<StorageDto>> Update(Guid id, DeliveryDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var delivery = await _service.UpdateAsync(dto);

                if (delivery == null)
                {
                    return NotFound();
                }
                return Ok(delivery);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
