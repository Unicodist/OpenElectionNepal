using OpenElection.Central.Domain.Enums;
using OpenElection.Central.Domain.Exceptions;
using OpenElection.Central.Domain.Services;
using OpenElection.Microservice;
using OpenElection.Microservice.Messages;

namespace OpenElection.Central.Actors;

public class BoothCoordinatorActor(ElectionService electionService) : ReceiveActorBase
{
    protected override void PreRestart(Exception reason, object message)
    {
        ReceiveAsync<BoothUpdateMessage>(HandleBoothUpdateMessage);
        base.PreRestart(reason, message);
    }

    private async Task HandleBoothUpdateMessage(BoothUpdateMessage message)
    {
        if (!Guid.TryParse(message.BoothId, out var id))
            throw new AppBaseException("Couldn't parse the supposed guid value into a Guid instance");
        if (BaseEnum.TryParse<BoothState>(message.BoothState, out var state))
        {
            await electionService.UpdateBoothState(id, state!);
        }

        throw new AppBaseException($"Invalid value {message.BoothState} for enum {nameof(BoothState)}");

    }
}