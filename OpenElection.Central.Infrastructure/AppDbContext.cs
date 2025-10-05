using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Npgsql;
using OpenElection.Central.Domain.Enums;
using OpenElection.Central.Infrastructure.Configuration;

namespace OpenElection.Central.Infrastructure;

public class AppDbContext(IOptions<DbInfo> dbInfo) : DbContext
{
    private readonly string _connectionString = GetConnectionString(dbInfo.Value);

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseNpgsql(_connectionString);
        }

        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new BoothConfiguration());
        modelBuilder.ApplyConfiguration(new VoteLedgerConfiguration());
        base.OnModelCreating(modelBuilder);
    }

    private static string GetConnectionString(DbInfo dbInfo)
    {
        var builder = new NpgsqlConnectionStringBuilder()
        {
            Host = dbInfo.Host,
            Port = dbInfo.Port,
            Username = dbInfo.Username,
            Password = dbInfo.Password,
            Database = dbInfo.Database
        };
        return builder.ConnectionString;
    }
}