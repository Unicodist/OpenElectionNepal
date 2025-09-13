using OpenElection.Microservice;
using OpenElection.Microservice.Messages;

namespace OpenElection.Central.Actors;

public class VoteActor: BaseActor
{
    public VoteActor()
    {
        ReceiveAsync<VoteRequestMessage>(HandleVoteRequestMessage);
    }

    private Task HandleVoteRequestMessage(VoteRequestMessage arg)
    {
        return Task.CompletedTask;
    }
}