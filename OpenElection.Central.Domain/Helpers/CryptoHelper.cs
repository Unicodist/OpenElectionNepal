using System.Security.Cryptography;
using System.Text;
using OpenElection.Central.Domain.Entities;

namespace OpenElection.Central.Domain.Helpers;

public class CryptoHelper
{
    /// <summary>
    /// Appends VoteLedger values and creates a new hash
    /// </summary>
    public static string EncryptVoteLedger(VoteLedger vote)
    {
        var dataToHash =
            $"{vote.Id}" +
            $"{vote.VoterHash}" +
            $"{vote.ConstituencyId}" +
            $"{vote.CandidateId}" +
            $"{vote.PreviousVoteHash}" +
            $"{vote.DigitalSignature}" +
            $"{vote.BoothId}";
        return ComputeSha256Hash(dataToHash);
    }

    /// <summary>
    /// Computes a SHA-256 hash for a given string input.
    /// </summary>
    private static string ComputeSha256Hash(string input)
    {
        var inputBytes = Encoding.UTF8.GetBytes(input);

        var hashBytes = SHA256.HashData(inputBytes);

        var sb = new StringBuilder();
        foreach (var b in hashBytes)
        {
            sb.Append(b.ToString("x2"));
        }

        return sb.ToString();
    }
}