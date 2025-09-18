namespace OpenElection.Central.Domain.Entities;

public class VoteLedger
{
    /// <summary>
    /// Unique identifier for the vote ledger entry.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Anonymized voter identifier (e.g., hashed voter ID) to protect privacy.
    /// </summary>
    public string VoterHash { get; set; }

    /// <summary>
    /// Identifier for the constituency (e.g., Kathmandu-1).
    /// </summary>
    public string ConstituencyId { get; set; }

    /// <summary>
    /// Identifier for the selected candidate or party (depending on election type).
    /// </summary>
    public string CandidateId { get; set; }

    /// <summary>
    /// Cryptographic hash of the current vote entry, used for blockchain integrity.
    /// </summary>
    public string VoteHash { get; set; }

    /// <summary>
    /// Hash of the previous ledger entry in the blockchain, linking votes for immutability.
    /// </summary>
    public string PreviousVoteHash { get; set; }

    /// <summary>
    /// Digital signature of the vote entry to ensure authenticity (Booth's signature).
    /// </summary>
    public string DigitalSignature { get; set; }

    /// <summary>
    /// Identifier for the booth where the vote was cast (linked to OpenElectionBooth).
    /// </summary>
    public Guid BoothId { get; set; }

}