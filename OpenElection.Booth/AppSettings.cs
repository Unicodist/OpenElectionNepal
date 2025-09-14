namespace OpenElection.Booth;

public class AppSettings
{
    public required string BoothId { get; set; }
    public required string CenterId { get; set; }
    public required string DistrictId { get; set; }
    public required string CandidateId { get; set; }
    public required string BoothSignature { get; set; }
}