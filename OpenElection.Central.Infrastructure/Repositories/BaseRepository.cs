using Microsoft.EntityFrameworkCore;

namespace OpenElection.Central.Infrastructure.Repositories;

public class BaseRepository<T>(AppDbContext context) where T : class
{
    private readonly DbSet<T> _set = context.Set<T>();

    public async Task InsertAsync(T entity)
    {
        await _set.AddAsync(entity);
        await context.SaveChangesAsync();
    }

    public async Task<ICollection<T>> GetAllAsync()
    {
        return await _set.ToListAsync();
    }
}