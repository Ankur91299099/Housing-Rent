using AutoMapper.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly Microsoft.Extensions.Configuration.IConfiguration configuration;

        public AccountController(IUnitOfWork uow , Microsoft.Extensions.Configuration.IConfiguration configuration)
        {
            this.uow = uow;
            this.configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginReqDto loginReq)
        {
            var user = await uow.UserRepositary.Authendicate(loginReq.UserName, loginReq.Password);

            if(user== null)
            {
                return Unauthorized();
            }

            var loginRes = new LoginResDto();
            loginRes.UserName = loginReq.UserName;
            loginRes.Token = CreateJWT(user);

            return Ok(loginRes);
        }

        private string CreateJWT(User user)
        {
            var secretKey = configuration.GetSection("AppSetting.Key").Value;

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            // var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("shhh... this is my secret key"));

            var claim = new Claim[]
            {
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claim),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescription);

            return tokenHandler.WriteToken(token);
        }
    }
}
