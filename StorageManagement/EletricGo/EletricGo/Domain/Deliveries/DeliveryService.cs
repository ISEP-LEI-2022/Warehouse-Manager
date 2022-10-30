using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Deliveries
{
    public class DeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDeliveryRepository _repo;

        public DeliveryService(IUnitOfWork unitOfWork, IDeliveryRepository repo)
        {
            _unitOfWork = unitOfWork;
            _repo = repo;
        }

        public async Task<List<DeliveryDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<DeliveryDto> DeliverieslistDto = list.ConvertAll<DeliveryDto>(delivery =>
                new DeliveryDto(delivery.Id.AsGuid(), delivery.DeliveryDate, delivery.DeliveryWeight, delivery.FinalStorageId, delivery.TimeToLoad, delivery.TimeToUnload, delivery.Products));

            return DeliverieslistDto;
        }

        public async Task<DeliveryDto> GetByIdAsync(DeliveryId id)
        {
            var delivery = await this._repo.GetByIdAsync(id);

            if (delivery == null)
                return null;

            return new DeliveryDto(delivery.Id.AsGuid(), delivery.DeliveryDate, delivery.DeliveryWeight, delivery.FinalStorageId, delivery.TimeToLoad, delivery.TimeToUnload, delivery.Products);
        }

        public async Task<DeliveryDto> AddAsync(CreatingDeliveryDto dto)
        {
            var delivery = new Delivery(dto.DeliveryDate, dto.DeliveryWeight, dto.FinalStorageId, dto.TimeToLoad, dto.TimeToUnload, dto.Products);
            //var delivery = new Delivery();
            await this._repo.AddAsync(delivery);

            await this._unitOfWork.CommitAsync();

            return new DeliveryDto(delivery.Id.AsGuid(), delivery.DeliveryDate, delivery.DeliveryWeight, delivery.FinalStorageId, delivery.TimeToLoad, delivery.TimeToUnload, delivery.Products);
        }
    }
}
