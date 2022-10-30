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
            var list = await this._repo.GetAll();

            List<StorageDto> StorageslistDto = list.ConvertAll<StorageDto>(storage =>
                new StorageDto(storage.Id.AsGuid(), storage.Designation, storage.Location));

            return StorageslistDto;
        }

        public async Task<StorageDto> GetByIdAsync(StorageId id)
        {
              var storage = await this._repo.GetById(id);

            List<StorageDto> StorageslistDto = storage.ConvertAll<StorageDto>(storage =>
                new StorageDto(storage.Id.AsGuid(), storage.Designation, storage.Location));

            return StorageslistDto[0];
        }

        public async Task<StorageDto> AddAsync(CreatingStorageDto dto)
        {
            var storage = new Storage(dto.Designation, dto.Location);

             await this._repo.AddAsync(storage);

             await this._unitOfWork.CommitAsync();

            return new StorageDto(storage.Id.AsGuid(), storage.Designation, storage.Location);
        }

        public async Task<StorageDto> UpdateAsync(StorageDto dto)
        {
            var queryResult = await this._repo.GetById(new StorageId(dto.Id));
            var storage = queryResult[0];
            
            if (storage == null)
                return null;

            // change all fields
            storage.changeDesignation(dto.Designation);

            await this._unitOfWork.CommitAsync();

            return new StorageDto(storage.Id.AsGuid(), storage.Designation, storage.Location);
        }
    }
}
