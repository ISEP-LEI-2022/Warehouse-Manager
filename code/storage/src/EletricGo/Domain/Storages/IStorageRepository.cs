
using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Storages
{
    public interface IStorageRepository: IRepository<Storage, StorageId>
    {
        //Task<List<Storage>> GetAll();
        //Task<List<Storage>> GetById(StorageId storageId);
        Task<bool> GetStorageByDesignation(string designation);
    }
}