using OpenElection.Central.Domain.Dtos;
using OpenElection.Central.Domain.Enums;
using OpenElection.Microservice.Messages;

namespace OpenElection.Central.Helpers;

public static class MappingHelper
{
    public static VoteIssueDto ToDto(this VoteRequestMessage message)
    {
        var dto = new VoteIssueDto(message.VoterGuid, message.BoothId, message.CandidateId, message.ConstituencyId,
            message.BoothSignature, message.VoterGuid);
        return dto;
    }

    public static BoothStateUpdateDto ToDto(this BoothUpdateMessage message)
    {
        if (!Guid.TryParse(message.BoothId, out var boothId) ||
            !BaseEnum.TryParse<BoothState>(message.BoothState, out var boothState) || boothState == null)
            throw new Exception("Invalid booth state");
        var dto = new BoothStateUpdateDto(boothId, boothState);
        return dto;

    }
}