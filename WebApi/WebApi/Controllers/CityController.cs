using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data;
using WebApi.Dtos;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Controllers
{

    [Authorize]
    public class CityController : BaseController
    {
       
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public CityController(IUnitOfWork uow,IMapper mapper) {
          
           this.uow = uow;
           this.mapper = mapper;
        }

        [HttpGet]
        public async  Task<IActionResult> GetCities() {

            var cities =  await uow.cityRepositary.GetCitiesAsync();

            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);
            //var citiesDto = from c in cities
            //                select new CityDto()
            //                {
            //                    Id = c.Id,
            //                    Name = c.Name,
            //                };

            return Ok(citiesDto);
        }

        [HttpPost("add")]
        [HttpPost("post")]
        [HttpPost("add/{cityname}")]
        public  async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = mapper.Map<City>(cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn=DateTime.Now;

            //var city = new City
            //{
            //    Name = cityDto.Name,
            //    LastUpdatedOn = DateTime.UtcNow,
            //    LastUpdatedBy = 1

            //};
            uow.cityRepositary.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id,CityDto cityDto)
        {
            var cityFromDb = await uow.cityRepositary.FindCity(id);

            if(cityFromDb == null)
            {
                return BadRequest("Update are not allowed");
            }
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityDto)
        {
            var cityFromDb = await uow.cityRepositary.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
                  uow.cityRepositary.DeleteCity(id);
                  await uow.SaveAsync();
                  return Ok(id);

        }
    }
}
