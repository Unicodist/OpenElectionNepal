using OpenElection.Central.Domain.Services;
using OpenElection.Central.Helpers;
using OpenElection.Microservice;
using OpenElection.Microservice.Messages;

namespace OpenElection.Central.Actors;

public class VoteActor: ReceiveActorBase
{
    private readonly VoteService _voteService;

    public VoteActor(VoteService voteService)
    {
        _voteService = voteService;
        ReceiveAsync<VoteRequestMessage>(HandleVoteRequestMessage);
    }

    private async Task HandleVoteRequestMessage(VoteRequestMessage message)
    {
        var dto = message.ToDto();
        await _voteService.IssueVote(dto);
    }
}