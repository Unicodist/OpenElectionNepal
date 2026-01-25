namespace OpenElection.Booth.ApiModels;

public class VerificationFailureResponseModel(string error)
{
    public bool IsVerified { get; set; } = false;
    public string Error { get; set; } = error;
}