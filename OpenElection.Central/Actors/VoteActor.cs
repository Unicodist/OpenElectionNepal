using OpenElection.Central.Domain.Services;
using OpenElection.Central.Helpers;
using OpenElection.Microservice;
using OpenElection.Microservice.Messages;

namespace OpenElection.Central.Actors;

public class VoteActor : ReceiveActorBase
{
    private readonly IServiceScopeFactory _scopeFactory;

    public VoteActor(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
        ReceiveAsync<VoteRequestMessage>(HandleVoteRequestMessage);
    }

    private async Task HandleVoteRequestMessage(VoteRequestMessage message)
    {
        using var scope = _scopeFactory.CreateScope();
        var voteService = scope.ServiceProvider.GetRequiredService<VoteService>();
        var dto = message.ToDto();
        await voteService.IssueVote(dto);
    }
}