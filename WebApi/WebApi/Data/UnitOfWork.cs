using System.Threading.Tasks;
using WebApi.Data.Repo;
using WebApi.Interfaces;

namespace WebApi.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;

        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }
        public ICityRepositary cityRepositary => 
            new CityRepositary(dc);

        public IUserRepositary UserRepositary => new UserRepositary(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}
