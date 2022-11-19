using System.Threading.Tasks;
using DDDSample1.Infrastructure;
using EletricGo.Domain.Shared;


namespace EletricGo.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        /*private readonly DDDSample1DbContext _context;

        public UnitOfWork(DDDSample1DbContext context)
        {
            this._context = context;
        }
        */
        private readonly DDDSample1DbContext _context;

        public UnitOfWork(DDDSample1DbContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}