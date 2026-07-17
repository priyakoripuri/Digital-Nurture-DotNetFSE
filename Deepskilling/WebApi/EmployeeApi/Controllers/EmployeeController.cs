using Microsoft.AspNetCore.Mvc;
using EmployeeApi.Models;

namespace EmployeeApi.Controllers;

[ApiController]
[Route("[controller]")]
public class EmployeeController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<Employee>> Get()
    {
        return GetStandardEmployeeList();
    }

    private List<Employee> GetStandardEmployeeList()
    {
        return new List<Employee>
        {
            new Employee
            {
                Id = 1,
                Name = "John",
                Salary = 50000,
                Permanent = true,
                DateOfBirth = new DateTime(1998,5,10),

                Department = new Department
                {
                    Id = 1,
                    Name = "IT"
                },

                Skills = new List<Skill>
                {
                    new Skill
                    {
                        Id = 1,
                        Name = "C#"
                    },
                    new Skill
                    {
                        Id = 2,
                        Name = "SQL"
                    }
                }
            }
        };
    }
}