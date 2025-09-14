using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OpenElection.Central.Domain.Entities;

namespace OpenElection.Central.Infrastructure.Configuration;

public class VoteLedgerConfiguration : IEntityTypeConfiguration<VoteLedger>
{
    public void Configure(EntityTypeBuilder<VoteLedger> entity)
    {
        // Required fields
        entity.Property(e => e.VoterHash).HasMaxLength(64);
        entity.Property(e => e.ConstituencyId).HasMaxLength(50);
        entity.Property(e => e.CandidateId).HasMaxLength(100);
        entity.Property(e => e.VoteHash).HasMaxLength(64);
        entity.Property(e => e.PreviousVoteHash).HasMaxLength(64);
        entity.Property(e => e.DigitalSignature).HasMaxLength(256);
        entity.Property(e => e.BoothId).HasMaxLength(50);

        entity.HasIndex(e => e.ElectionId);
        entity.HasIndex(e => e.ConstituencyId);
    }
}