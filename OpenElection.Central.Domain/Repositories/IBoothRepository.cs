using OpenElection.Central.Domain.Entities;

namespace OpenElection.Central.Domain.Repositories;

public interface IBoothRepository
{
    Task<Booth?> GetByIdAsync(Guid id);
}