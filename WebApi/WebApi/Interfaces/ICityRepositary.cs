﻿using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface ICityRepositary
    {
        Task<IEnumerable<City>> GetCitiesAsync();
        void AddCity(City city);
        void DeleteCity(int id);

        Task<City> FindCity(int id);


    }
}
