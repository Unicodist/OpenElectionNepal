namespace OpenElection.Booth.ApiModels;

public class VoteRequestApiModel
{
    public string VoterId { get; set; }
    public string CandidateId { get; set; }
}