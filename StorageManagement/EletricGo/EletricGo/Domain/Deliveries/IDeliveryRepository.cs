
using EletricGo.Domain.Deliveries;
using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Deliveries
{
    public interface IDeliveryRepository: IRepository<Delivery, DeliveryId>
    {
    }
}