using OpenElection.Central.Domain.Services;
using OpenElection.Central.Helpers;
using OpenElection.Microservice;
using OpenElection.Microservice.Messages;

namespace OpenElection.Central.Actors;

public class BoothCoordinator(ElectionService electionService) : ReceiveActorBase
{
    private readonly ElectionService _electionService = electionService;

    protected override void PreRestart(Exception reason, object message)
    {
        ReceiveAsync<BoothUpdateMessage>(HandleBoothUpdateMessage);
        base.PreRestart(reason, message);
    }

    private async Task HandleBoothUpdateMessage(BoothUpdateMessage message)
    {
        var dto = message.ToDto();
        await electionService.UpdateBoothState(dto);
    }
}