using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OpenElection.Central.Domain.Entities;

namespace OpenElection.Central.Infrastructure.Configuration;

public class VoteLedgerConfiguration : IEntityTypeConfiguration<VoteLedger>
{
    public void Configure(EntityTypeBuilder<VoteLedger> entity)
    {
        entity.HasIndex(l => l.BoothId);
    }
}