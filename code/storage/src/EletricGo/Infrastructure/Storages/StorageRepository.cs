using DDDSample1.Infrastructure;
using EletricGo.Domain.Shared;
using EletricGo.Domain.Storages;
using EletricGo.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace EletricGo.Infrastructure.Storages
{
    public class StorageRepository : BaseRepository<Storage, StorageId>,IStorageRepository
    {
        DDDSample1DbContext _context;
        public StorageRepository(DDDSample1DbContext context) : base(context.Storage)
        {
            _context = context;
        }



        public async Task<List<Storage>> GetAllAsync()
        {
            var query = _context.Set<Storage>();
            query.Include(storage => storage.Location).ThenInclude(location => location.Address).ThenInclude(address => address.City).ToList();
            query.Include(storage => storage.ChargingSystems).ToList();
            return await query.ToListAsync();
        }



        //public async Task<List<Storage>> GetAll()
        //{
        //    var query = _context.Set<Storage>();
        //    query.Include(storage => storage.Location).ThenInclude(location => location.Address).ThenInclude(address => address.City).ToList();
        //    query.Include(storage => storage.ChargingSystems).ToList();
        //    return query.Any() ? query.ToList() : new List<Storage>();
        //}

        public async Task<Storage> GetByIdAsync(StorageId id)
        {
            var query = _context.Set<Storage>();
            query.Where(x => id == x.Id).Include(storage => storage.Location).ThenInclude(location => location.Address).ThenInclude(address => address.City).ToList();
            query.Include(storage => storage.ChargingSystems).ToList();

            return await query.FirstOrDefaultAsync();
        }
    }
}
