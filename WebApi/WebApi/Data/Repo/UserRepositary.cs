using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Data.Repo
{
    public class UserRepositary : IUserRepositary
    {
        private readonly DataContext dc;

        public UserRepositary(DataContext dc) {

            this.dc = dc;
        }
        public async Task<User> Authendicate(string userName, string password)
        {
            return await dc.Users.FirstOrDefaultAsync(x => x.UserName == userName 
            && x.Password == password);
        }
    }
}
