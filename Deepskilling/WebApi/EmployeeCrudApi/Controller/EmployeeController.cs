using Microsoft.AspNetCore.Mvc;

namespace EmployeeCrudApi.Controller;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Employee API is working");
    }
}