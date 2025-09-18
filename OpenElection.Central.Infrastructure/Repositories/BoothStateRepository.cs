using Microsoft.EntityFrameworkCore;
using OpenElection.Central.Domain.Entities;
using OpenElection.Central.Domain.Enums;
using OpenElection.Central.Domain.Repositories;

namespace OpenElection.Central.Infrastructure.Repositories;

public class BoothStateRepository(AppDbContext context) : BaseRepository<CurrentBoothState>(context), IBoothStateRepository
{
    public async Task<CurrentBoothState?> GetByBoothIdAsync(Guid boothId)
    {
        var booth = await GetQueryable().FirstOrDefaultAsync(s => s.BoothId == boothId);
        return booth;
    }
}