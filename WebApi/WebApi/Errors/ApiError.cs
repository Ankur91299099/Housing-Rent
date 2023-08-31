using System.Text.Json;

namespace WebApi.Errors
{
    public class ApiError
    {
        public ApiError(int statusCode, string errorMessage, string errorDetails=null)
        {
            StatusCode = statusCode;
            ErrorDetails = errorDetails;
            ErrorMessage = errorMessage;
        }

        public int StatusCode { get; set; }

        public string ErrorDetails { get; set; }

        public string ErrorMessage { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
