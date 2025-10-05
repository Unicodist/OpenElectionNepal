using OpenElection.Central.Domain.Dtos;
using OpenElection.Central.Domain.Entities;

namespace OpenElection.Central.Domain.Helpers;

public static class MappingHelper
{
    public static VoteLedger ToEntity(this VoteIssueDto dto)
    {
        var ledger = new VoteLedger()
        {
            ConstituencyId = dto.ConstituencyId,
            DigitalSignature = dto.DigitalSignature,
            VoterHash = dto.VoterHash
        };
        return ledger;
    }
}