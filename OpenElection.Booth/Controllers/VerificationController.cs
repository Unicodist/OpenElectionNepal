using Microsoft.AspNetCore.Mvc;
using OpenElection.Booth.ApiModels;

namespace OpenElection.Booth.Controllers;

[ApiController]
[Route("api/verification")]
public class VerificationController: ControllerBase
{
    [HttpPost]
    public IActionResult Verify(string hash)
    {
        var successModel = new VerificationSuccessResponseModel("V123456", "John Doe", hash, true);
        var failureModel = new VerificationFailureResponseModel("Invalid identity hash.");

        var random = new Random();
        if (random.Next(2) == 0)
        {
            return Ok(successModel);
        }

        return BadRequest(failureModel);
    }
}