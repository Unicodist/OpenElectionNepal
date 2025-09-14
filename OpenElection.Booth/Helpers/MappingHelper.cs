using OpenElection.Booth.ApiModels;
using OpenElection.Microservice.Messages;

namespace OpenElection.Booth.Helpers;

public static class MappingHelper
{
    public static VoteRequestMessage ToMessage(this VoteRequestApiModel model, AppSettings appSettings)
    {
        var message = new VoteRequestMessage()
        {
            BoothId = appSettings.BoothId,
            CenterId = appSettings.CenterId,
            DistrictId = appSettings.DistrictId,
            PartyId = appSettings.CandidateId,
            VoterGuid = model.VoterId,
            BoothSignature = appSettings.BoothSignature
        };
        return message;
    }
}