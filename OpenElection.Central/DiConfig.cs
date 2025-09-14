using OpenElection.Central.Domain.Repositories;
using OpenElection.Central.Domain.Services;
using OpenElection.Central.Infrastructure.Repositories;

namespace OpenElection.Central;

public static class DiConfig
{
    public static IServiceCollection ConfigureServices(this IServiceCollection services)
    {
        services.AddSingleton<IVoteLedgerRepository, VoteLedgerRepository>();
        services.AddSingleton<VoteService>();
        return services;
    }
}