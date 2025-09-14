using OpenElection.Central.Domain.Entities;

namespace OpenElection.Central.Domain.Repositories;

public interface IVoteLedgerRepository
{
    Task InsertAsync(VoteLedger ledger);
}