namespace OpenElection.Microservice.Messages;

public class BoothUpdateMessage
{
    public string BoothId { get; set; }
    public string BoothState { get; set; }
}