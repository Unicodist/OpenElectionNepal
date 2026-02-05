# OpenElection.Central.Infrastructure

**Type:** Class Library  
**Purpose:** Data access, database context, and infrastructure implementations  
**Location:** `/OpenElection.Central.Infrastructure/`

## Overview

OpenElection.Central.Infrastructure contains the data access layer, Entity Framework Core configurations, database migrations, and implementations of repository interfaces defined in the domain project.

## Responsibilities

- **Database Context:** AppDbContext for data access
- **Repository Implementations:** Concrete implementations of domain repositories
- **Entity Configurations:** EF Core fluent API configurations
- **Database Migrations:** Schema versions and changes
- **Seed Data:** Initial data loading
- **Connection Management:** Database connection setup

## Directory Structure

```
OpenElection.Central.Infrastructure/
├── AppDbContext.cs
├── DbInfo.cs
├── Configuration/
│   ├── ElectionConfiguration.cs
│   ├── CandidateConfiguration.cs
│   ├── VoteConfiguration.cs
│   ├── BoothConfiguration.cs
│   └── [Other entity configurations]
├── Migrations/
│   ├── 20260101000000_InitialCreate.cs
│   ├── 20260102000000_AddIndexes.cs
│   └── [Other migrations]
├── Repositories/
│   ├── VoteRepository.cs
│   ├── ElectionRepository.cs
│   ├── CandidateRepository.cs
│   ├── BoothRepository.cs
│   └── [Other repository implementations]
└── OpenElection.Central.Infrastructure.csproj
```

## Database Context

### AppDbContext.cs
```csharp
public class AppDbContext : DbContext
{
    public DbSet<Election> Elections { get; set; }
    public DbSet<Candidate> Candidates { get; set; }
    public DbSet<Vote> Votes { get; set; }
    public DbSet<Booth> Booths { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Apply entity configurations
    }
}
```

## Entity Configurations

Entity configurations define relationships, constraints, and indexes using EF Core Fluent API.

### Example: VoteConfiguration
```csharp
public class VoteConfiguration : IEntityTypeConfiguration<Vote>
{
    public void Configure(EntityTypeBuilder<Vote> builder)
    {
        builder.HasKey(v => v.Id);

        builder.Property(v => v.CastTime)
            .IsRequired();

        builder.HasOne(v => v.Candidate)
            .WithMany(c => c.Votes)
            .HasForeignKey(v => v.CandidateId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(v => v.Booth)
            .WithMany(b => b.Votes)
            .HasForeignKey(v => v.BoothId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(v => v.CastTime);
        builder.HasIndex(v => new { v.BoothId, v.CandidateId });
    }
}
```

## Repository Implementations

Repositories implement data access operations with Entity Framework Core.

### Example: VoteRepository
```csharp
public class VoteRepository : IVoteRepository
{
    private readonly AppDbContext _context;

    public VoteRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Vote> GetByIdAsync(int id)
    {
        return await _context.Votes
            .Include(v => v.Candidate)
            .Include(v => v.Booth)
            .FirstOrDefaultAsync(v => v.Id == id);
    }

    public async Task<IEnumerable<Vote>> GetByCandidateAsync(int candidateId)
    {
        return await _context.Votes
            .Where(v => v.CandidateId == candidateId)
            .ToListAsync();
    }

    public async Task AddAsync(Vote vote)
    {
        await _context.Votes.AddAsync(vote);
        await _context.SaveChangesAsync();
    }

    // Additional methods...
}
```

## Database Migrations

Migrations track database schema changes over time.

### Migration Structure
```csharp
public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        // Create tables
        migrationBuilder.CreateTable(
            name: "Elections",
            columns: table => new
            {
                Id = table.Column<int>(),
                Name = table.Column<string>(),
                StartTime = table.Column<DateTime>(),
                EndTime = table.Column<DateTime>(),
                Status = table.Column<int>(),
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Elections", x => x.Id);
            });

        // Create relationships and indexes...
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable("Elections");
    }
}
```

### Migration Commands
```bash
# Create a new migration
dotnet ef migrations add MigrationName

# Update database to latest migration
dotnet ef database update

# Revert to previous migration
dotnet ef database update PreviousMigrationName

# Remove last migration
dotnet ef migrations remove
```

## Configuration

### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=OpenElectionNepal;User Id=sa;Password=..."
  }
}
```

### Program.cs Setup
```csharp
services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        configuration.GetConnectionString("DefaultConnection")));

services.AddScoped<IVoteRepository, VoteRepository>();
services.AddScoped<IElectionRepository, ElectionRepository>();
// Register other repositories...
```

## Data Access Patterns

### Query Pattern
```csharp
var votes = await _repository.GetByCandidateAsync(candidateId);
```

### Create Pattern
```csharp
var vote = new Vote { CandidateId = 1, BoothId = 1 };
await _repository.AddAsync(vote);
```

### Update Pattern
```csharp
var vote = await _repository.GetByIdAsync(id);
vote.Status = VoteStatus.Verified;
await _repository.UpdateAsync(vote);
```

### Delete Pattern
```csharp
await _repository.DeleteAsync(id);
```

## Performance Optimization

### Indexing Strategy
- Index frequently queried columns
- Index foreign keys
- Use composite indexes for common queries

### Query Optimization
- Use eager loading (Include) for related entities
- Avoid N+1 query problems
- Use AsNoTracking() for read-only queries
- Implement pagination for large result sets

### Example Optimized Query
```csharp
var results = await _context.Votes
    .Include(v => v.Candidate)
    .Include(v => v.Booth)
    .Where(v => v.Election.Id == electionId)
    .AsNoTracking()
    .Take(100)
    .ToListAsync();
```

## Database Maintenance

### Backup Strategy
- Regular automated backups
- Test restore procedures
- Document backup schedule

### Monitoring
- Monitor query performance
- Track database size growth
- Monitor connection pool usage

## Integration with Services

All services that need data access use repositories:

```csharp
public class VoteService
{
    private readonly IVoteRepository _voteRepository;

    public VoteService(IVoteRepository voteRepository)
    {
        _voteRepository = voteRepository;
    }

    public async Task ProcessVoteAsync(Vote vote)
    {
        await _voteRepository.AddAsync(vote);
    }
}
```

## Dependencies

### External
- Entity Framework Core
- SQL Server (or other supported database)
- .NET Core

### Internal
- OpenElection.Central.Domain

## Development Guidelines

### Adding a New Entity
1. Define entity in Domain project
2. Create Configuration in Configuration/
3. Register in AppDbContext
4. Create repository interface in Domain
5. Implement repository in Repositories/
6. Create migration
7. Test data access

### Migration Checklist
- [ ] Migration name describes change
- [ ] Up method implements change
- [ ] Down method reverts change
- [ ] No breaking changes without version consideration
- [ ] Tested locally
- [ ] Tested with data

---

**Last Updated:** 2026-02-05  
**Maintainer:** Development Team  
**Status:** Active
