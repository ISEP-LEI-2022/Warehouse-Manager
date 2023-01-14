using DDDSample1.Infrastructure;
using EletricGo.Domain.Deliveries;
using EletricGo.Domain.Storages;
using EletricGo.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace EletricGo.Infrastructure.Deliveries
{
    public class DeliveryRepository : BaseRepository<Delivery, DeliveryId>, IDeliveryRepository
    {
        DDDSample1DbContext _context;
        public DeliveryRepository(DDDSample1DbContext context) : base(context.Delivery)
        {
            _context = context;
        }

        public async Task<List<Delivery>> GetAllAsync()
        {
            var query = _context.Set<Delivery>();
            //query.Include(storage => storage._idFinalStorage).ToList();
            query.Include(products => products.Products).ToList();
            return await query.ToListAsync();
        }

        public async Task<Delivery> GetByIdAsync(DeliveryId id)
        {
            var result = _context.Delivery.Where(x => id == x.Id).Include(products => products.Products).FirstAsync();

            return await result;
        }
    }
}
