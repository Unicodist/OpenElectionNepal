using OpenElection.Central.Domain.Entities;
using OpenElection.Central.Domain.Repositories;

namespace OpenElection.Central.Infrastructure.Repositories;

public class BoothRepository(AppDbContext context) : BaseRepository<Booth>(context), IBoothRepository
{
}