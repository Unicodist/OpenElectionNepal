using Microsoft.EntityFrameworkCore;

namespace OpenElection.Central.Infrastructure.Repositories;

public class BaseRepository<T>(AppDbContext context) where T : class
{
    private readonly DbSet<T> _set = context.Set<T>();

    public IQueryable<T> GetQueryable() => _set;
    public async Task InsertAsync(T entity)
    {
        await _set.AddAsync(entity);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(T entity)
    {
        _set.Update(entity);
        await context.SaveChangesAsync();
    }

    public async Task<ICollection<T>> GetAllAsync()
    {
        return await _set.ToListAsync();
    }

    public async Task<T?> GetByIdAsync(Guid id)
    {
        return await _set.FindAsync(id);
    }
}