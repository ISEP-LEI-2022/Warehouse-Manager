using DDDSample1.Infrastructure;
using EletricGo.Domain.Deliveries;
using EletricGo.Domain.Storages;
using EletricGo.Infrastructure.Shared;

namespace EletricGo.Infrastructure.Deliveries
{
    public class DeliveryRepository : BaseRepository<Delivery, DeliveryId>,IDeliveryRepository
    {
        public DeliveryRepository(DDDSample1DbContext context) : base(context.Deliveries)
        {

        }
    }
}
