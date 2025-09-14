using OpenElection.Central.Domain.Dtos;
using OpenElection.Microservice.Messages;

namespace OpenElection.Central.Infrastructure.Helpers;

public static class MappingHelpers
{
    public static VoteIssueDto ToDto(this VoteRequestMessage message)
    {
        var dto = new VoteIssueDto(message.VoterGuid,message.BoothId,message.CandidateId,message.ConstituencyId,message.BoothSignature, message.VoterGuid);
        return dto;
    }
}