using DDDSample1.Infrastructure;
using EletricGo.Domain.Deliveries;
using EletricGo.Domain.Storages;
using EletricGo.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace EletricGo.Infrastructure.Deliveries
{
    public class DeliveryRepository : BaseRepository<Delivery, DeliveryId>,IDeliveryRepository
    {
        DDDSample1DbContext _context;
        public DeliveryRepository(DDDSample1DbContext context) : base(context.Deliveries)
        {
            _context = context;
        }

        public async Task<List<Delivery>> GetAll()
        {
            var query = _context.Set<Delivery>();
            query.Include(storage => storage.FinalStorageId).ToList();
            query.Include(products => products.Products).ToList();
            return query.Any() ? query.ToList() : new List<Delivery>();
        }

        public async Task<List<Delivery>> GetById(DeliveryId id)
        {
            var query = _context.Set<Delivery>();
            query.Include(delivery => delivery.FinalStorageId).ThenInclude(storage => storage.Location).ThenInclude(location => location.Address).ThenInclude(address => address.City).ToList();
            query.Include(delivery => delivery.Products).ToList();

            return query.Any() ? query.ToList() : new List<Delivery>();
        }
    }
}
