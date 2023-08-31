using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IUserRepositary
    {
        Task<User> Authendicate(string userName, string password);
    }
}
