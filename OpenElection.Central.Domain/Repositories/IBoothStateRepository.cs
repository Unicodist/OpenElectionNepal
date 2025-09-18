using OpenElection.Central.Domain.Entities;

namespace OpenElection.Central.Domain.Repositories;

public interface IBoothStateRepository
{
    Task InsertAsync(CurrentBoothState state);
    Task<CurrentBoothState?> GetByBoothIdAsync(Guid boothId);
    Task UpdateAsync(CurrentBoothState boothState);
}