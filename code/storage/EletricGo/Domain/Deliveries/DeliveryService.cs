using EletricGo.Domain.Shared;
using EletricGo.Domain.Storages;

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
                new DeliveryDto(delivery.Id.AsGuid(), delivery.DeliveryDate, delivery.DeliveryWeight, delivery.FinalStorageId.AsGuid(), delivery.TimeToLoad, delivery.TimeToUnload,delivery.Products.ConvertAll<ProductDto>(product => new ProductDto(product.Id.AsGuid(), product.Name, product.Weight, product.LevelOfPolution))));

            return DeliverieslistDto;
        }

        public async Task<DeliveryDto> GetByIdAsync(DeliveryId id)
        {
            var delivery = await this._repo.GetByIdAsync(id);
            List<ProductDto> products = delivery.Products.ConvertAll<ProductDto>(product => new ProductDto(product.Id.AsGuid(), product.Name, product.Weight, product.LevelOfPolution));

            

            return new DeliveryDto(delivery.Id.AsGuid(), delivery.DeliveryDate, delivery.DeliveryWeight, delivery.FinalStorageId.AsGuid(), delivery.TimeToLoad, delivery.TimeToUnload, products);
        }

        public async Task<DeliveryDto> AddAsync(CreatingDeliveryDto dto)
        {
            var delivery = new Delivery(dto.DeliveryDate, dto.DeliveryWeight, new StorageId(dto.FinalStorageId), dto.TimeToLoad, dto.TimeToUnload, dto.Products);
            await this._repo.AddAsync(delivery);

            await this._unitOfWork.CommitAsync();

            List<ProductDto> products = delivery.Products.ConvertAll<ProductDto>(product => new ProductDto(product.Id.AsGuid(), product.Name, product.Weight, product.LevelOfPolution));

            return new DeliveryDto(delivery.Id.AsGuid(), delivery.DeliveryDate, delivery.DeliveryWeight, delivery.FinalStorageId.AsGuid(), delivery.TimeToLoad, delivery.TimeToUnload, products);
        }

        public async Task<DeliveryDto> UpdateAsync(DeliveryDto dto)
        {
            var queryResult = await this._repo.GetByIdAsync(new DeliveryId(dto.Id));
            var delivery = queryResult;

            if (delivery == null)
                return null;

            // change all fields
            delivery.changeDeliveryDate(dto.DeliveryDate);
            delivery.changeDeliveryWeight(dto.DeliveryWeight);
            delivery.changeTimeToLoad(dto.TimeToLoad);
            delivery.changeTimeToUnload(dto.TimeToUnload);

            await this._unitOfWork.CommitAsync();

            List<ProductDto> products = delivery.Products.ConvertAll<ProductDto>(product => new ProductDto(product.Id.AsGuid(), product.Name, product.Weight, product.LevelOfPolution));

            return new DeliveryDto(delivery.Id.AsGuid(),delivery.DeliveryDate,delivery.DeliveryWeight, delivery.FinalStorageId.AsGuid(), delivery.TimeToLoad,delivery.TimeToUnload, products);
        }
    }
}
