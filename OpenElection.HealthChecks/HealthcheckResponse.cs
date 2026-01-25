namespace OpenElection.HealthChecks;

public class HealthcheckResponse
{
    public string Status { get; set; }
    public long Timestamp { get; set; }
    public ICollection<dynamic> Checks { get; set; }
}