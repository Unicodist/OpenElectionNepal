using Microsoft.EntityFrameworkCore;

namespace OpenElection.Central.Infrastructure;

public class AppDbContext: DbContext
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        base.OnModelCreating(modelBuilder);
    }
}