using OpenElection.Central.Domain.Dtos;
using OpenElection.Central.Domain.Entities;

namespace OpenElection.Central.Domain.Helpers;

public static class MappingHelper
{
    public static VoteLedger ToEntity(this VoteIssueDto dto)
    {
        var ledger = new VoteLedger()
        {
            BoothId = dto.BoothId,
            CandidateId = dto.CandidateId,
            ConstituencyId = dto.ConstituencyId,
            DigitalSignature = dto.DigitalSignature,
            ElectionId = dto.ElectionId,
            PreviousVoteHash = dto.PreviousVoteHash,
            VoteHash = Guid.NewGuid().ToString(),
            VoterHash = dto.VoterHash
        };
        return ledger;
    }
}