﻿using System.ComponentModel.DataAnnotations;

namespace WebApi.Dtos
{
    public class CityDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="Name field is mandatory")]
        public string Name { get; set; }

        [Required] 
        public string Country { get; set; }
    }
}
