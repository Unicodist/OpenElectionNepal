namespace OpenElection.Central.Domain.Entities;

public class VoteBooth
{
    public long Id { get; set; }
    public string BoothName { get; set; }
    public long CenterId { get; set; }
    public VoteCenter VoteCenter { get; set; }
}