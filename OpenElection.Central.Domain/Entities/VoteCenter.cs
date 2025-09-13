namespace OpenElection.Central.Domain.Entities;

public class VoteCenter
{
    public long Id { get; set; }
    public string CenterName { get; set; }
    public long DistrictId { get; set; }
    public District District { get; set; }
    public ICollection<VoteBooth> Booths { get; set; }
}