using EletricGo.Domain.Shared;
using EletricGo.Domain.Storages;
using Microsoft.AspNetCore.Mvc;

namespace EletricGo.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class StoragesController : ControllerBase
    {
        private readonly StorageService _service;

        public StoragesController(StorageService service)
        {
            _service = service;
        }

        // GET: api/Storages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StorageDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Storages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StorageDto>> GetGetById(Guid id)
        {
            var storage = await _service.GetByIdAsync(new StorageId(id));

            if (storage == null)
            {
                return NotFound();
            }
            return storage;
        }



        // POST: api/Storages/
        [HttpPost]
        public async Task<ActionResult<StorageDto>> Create(CreatingStorageDto dto)
        {
            try
            {
                var storage = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = storage.Id }, storage);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // PUT: api/Storages/5
        [HttpPut("{id}")]
        public async Task<ActionResult<StorageDto>> Update(Guid id, StorageDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var storage = await _service.UpdateAsync(dto);

                if (storage == null)
                {
                    return NotFound();
                }
                return Ok(storage);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
