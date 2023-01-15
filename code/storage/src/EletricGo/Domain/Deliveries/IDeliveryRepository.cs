
using EletricGo.Domain.Deliveries;
using EletricGo.Domain.Shared;
using EletricGo.Domain.Storages;

namespace EletricGo.Domain.Deliveries
{
    public interface IDeliveryRepository: IRepository<Delivery, DeliveryId>
    {
        //Task<List<Delivery>> GetAll();
        //Task<List<Delivery>> GetById(DeliveryId deliveryId);
        Task<List<Delivery>> GetAllAsyncByPagination(int page, int pageRecords);
    }
}