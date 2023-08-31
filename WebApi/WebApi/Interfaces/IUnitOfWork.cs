using System.Threading.Tasks;

namespace WebApi.Interfaces
{
    public interface IUnitOfWork
    {
        ICityRepositary cityRepositary { get; }

        IUserRepositary UserRepositary { get; }

        Task<bool> SaveAsync();
    }
}
