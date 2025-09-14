using OpenElection.Central.Domain.Entities;
using OpenElection.Central.Domain.Repositories;

namespace OpenElection.Central.Infrastructure.Repositories;

public class VoteLedgerRepository(AppDbContext context) :BaseRepository<VoteLedger>(context), IVoteLedgerRepository
{
    
}