namespace OpenElection.Central.Domain.Dtos;

public record VoteIssueDto(
    string VoterGuid,
    string BoothId,
    string CandidateId,
    string ConstituencyId,
    string DigitalSignature,
    string VoterHash);