using Akka.Actor;
using Microsoft.AspNetCore.Mvc;
using OpenElection.Booth.ApiModels;
using OpenElection.Booth.Helpers;
using OpenElection.Microservice.Messages;

namespace OpenElection.Booth.Controllers;

[ApiController]
[Route("api/vote")]
public class VoteController(AppSettings appSettings, ActorSystem system): ControllerBase
{
    private readonly ActorSelection _voteActor = system.ActorSelection("/user/vote");
    [HttpGet]
    public async Task<IActionResult> Vote(VoteRequestApiModel model)
    {
        var dto = model.ToMessage(appSettings);
        var response = await _voteActor.Ask<VoteResponseMessage>(dto);
        return Ok(response);
    }
    
    
}