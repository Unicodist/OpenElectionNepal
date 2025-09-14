using OpenElection.Central.Domain.Dtos;
using OpenElection.Central.Domain.Helpers;
using OpenElection.Central.Domain.Repositories;

namespace OpenElection.Central.Domain.Services;

public class VoteService(IVoteLedgerRepository voteRepository)
{
    public async Task IssueVote(VoteIssueDto dto)
    {
        var ledger = dto.ToEntity();
        ledger.VoteHash = CryptoHelper.EncryptVoteLedger(ledger);
        await voteRepository.InsertAsync(ledger);
    }
}