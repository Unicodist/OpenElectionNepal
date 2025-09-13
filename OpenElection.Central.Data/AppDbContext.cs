using Microsoft.EntityFrameworkCore;

namespace OpenElection.Central.Data;

public class AppDbContext: DbContext
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        base.OnModelCreating(modelBuilder);
    }
}