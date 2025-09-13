namespace OpenElection.Central.Domain.Entities;

public class VoteArea
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string AreaCode { get; set; }
    public long DistrictId { get; set; }
    public District District { get; set; }
}