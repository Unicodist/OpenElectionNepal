using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OpenElection.Central.Domain.Entities;
using OpenElection.Central.Domain.Enums;

namespace OpenElection.Central.Infrastructure.Configuration;

public class BoothConfiguration: IEntityTypeConfiguration<Booth>
{
    public void Configure(EntityTypeBuilder<Booth> builder)
    {
        builder.Property(b=>b.BoothState).HasConversion<string>(state => state.ToString(), state => BaseEnum.ForceParse<BoothState>(state));
    }
}