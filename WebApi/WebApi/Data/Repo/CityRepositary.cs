using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Data.Repo
{
    public class CityRepositary : ICityRepositary
    {
        private readonly DataContext dc;

        public CityRepositary(DataContext dc)
        {
            this.dc = dc;
        }


        public void AddCity(City city)
        {
            dc.Cities.Add(city);
        }

        public void DeleteCity(int id)
        {
            var city = dc.Cities.Find(id);
            dc.Cities.Remove(city);
        }

        public async Task<City> FindCity(int id)
        {
           return await dc.Cities.FindAsync(id);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await dc.Cities.ToListAsync();
        }

       
    }
}
