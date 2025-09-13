namespace OpenElection.Microservice.Messages;

public class VoteRequestMessage
{
    public string PartyId { get; set; }
    public string VoterGuid { get; set; }
    public string DistrictId { get; set; }
    public string CenterId { get; set; }
    public string BoothId { get; set; }
}