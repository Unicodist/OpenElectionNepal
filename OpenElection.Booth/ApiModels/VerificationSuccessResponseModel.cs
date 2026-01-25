namespace OpenElection.Booth.ApiModels;

public class VerificationSuccessResponseModel(string voterId, string voterName, string identityHash, bool isVerified)
{
    public string VoterName { get; set; } = voterName;
    public string VoterId { get; set; } = voterId;
    public string IdentityHash { get; set; } = identityHash;
    public bool IsVerified { get; set; } = true;
}