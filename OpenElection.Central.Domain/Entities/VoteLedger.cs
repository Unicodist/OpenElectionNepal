namespace OpenElection.Central.Domain.Entities;

public class VoteLedger
{
    public long Id { get; set; }
    public string? PreviousHash { get; set; }
    public long BoothId { get; set; }
    public long CenterId { get; set; }
    public long DistrictId { get; set; }
    public long StateId { get; set; }
    public long PartyId { get; set; }
    public string VoterGuid { get; set; }
}