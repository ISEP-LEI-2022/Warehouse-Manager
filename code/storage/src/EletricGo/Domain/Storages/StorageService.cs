using EletricGo.Domain.Shared;
using System.Collections.Generic;

namespace EletricGo.Domain.Storages
{
    public class StorageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IStorageRepository _repo;

        public StorageService(IUnitOfWork unitOfWork, IStorageRepository repo)
        {
            _unitOfWork = unitOfWork;
            _repo = repo;
        }

        public async Task<List<StorageDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<StorageDto> StorageslistDto = list.ConvertAll<StorageDto>(storage =>
                new StorageDto(storage.Id.AsGuid(), storage.Designation, storage.Location, storage.ChargingSystems, storage.Active));

            return StorageslistDto;
        }

        public async Task<List<StorageDto>> GetAllAsyncByPagination(int page, int pageRecords) {
            var list = await this._repo.GetAllAsyncByPagination(page,pageRecords);

            List<StorageDto> StorageslistDto = list.ConvertAll<StorageDto>(storage =>
                new StorageDto(storage.Id.AsGuid(), storage.Designation, storage.Location, storage.ChargingSystems, storage.Active));

            return StorageslistDto;
        }

        public async Task<StorageDto> GetByIdAsync(StorageId id)
        {
            var storage = await this._repo.GetByIdAsync(id);

            if(storage == null)
            {
                return null;
            }
            else
            {
                return new StorageDto(storage.Id.AsGuid(), storage.Designation, storage.Location, storage.ChargingSystems, storage.Active);

            }
        }

        public async Task<StorageDto> AddAsync(CreatingStorageDto dto)
        {
            //check if storage exists
            var exists = _repo.GetStorageByDesignation(dto.Designation);
            if (exists.Result)
                throw new Exception("It already exists a Storage with that Designation");

            var storage = new Storage(dto.Designation, dto.Location, dto.ChargingSystems);

             await this._repo.AddAsync(storage);

             await this._unitOfWork.CommitAsync();

            return new StorageDto(storage.Id.AsGuid(), storage.Designation, storage.Location, storage.ChargingSystems, storage.Active);
        }

        public async Task<StorageDto> UpdateAsync(StorageDto dto)
        {
            var queryResult = await this._repo.GetByIdAsync(new StorageId(dto.Id));
            var storage = queryResult;
            
            if (storage == null)
                return null;

            // change all fields
            storage.changeDesignation(dto.Designation);
            storage.changeLocation(dto.Location);
            storage.changeChargingSystems(dto.ChargingSystems);
            storage.changeActive(dto.Active);

            await this._unitOfWork.CommitAsync();

            return new StorageDto(storage.Id.AsGuid(), storage.Designation, storage.Location, storage.ChargingSystems, storage.Active);
        }
    }
}
