using OpenElection.Central.Domain.Entities;
using OpenElection.HealthChecks.Services;

namespace OpenElection.Central.Infrastructure.Repositories;

public class HealthCheckRepository(AppDbContext context) : BaseRepository<Booth>(context), IDatabaseHealthcheckRepository
{
    public async Task<TimeSpan> PingAsync()
    {
        return await PingDatabaseAsync();
    }
}