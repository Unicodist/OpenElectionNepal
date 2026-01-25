using OpenElection.Central.Domain.Repositories;
using OpenElection.Central.Domain.Services;
using OpenElection.Central.Infrastructure.Repositories;
using OpenElection.HealthChecks.Services;

namespace OpenElection.Central;

public static class DiConfig
{
    public static IServiceCollection ConfigureServices(this IServiceCollection services)
    {
        services.AddScoped<IDatabaseHealthcheckRepository, HealthCheckRepository>();
        services.AddScoped<IBoothRepository, BoothRepository>();
        services.AddScoped<IVoteLedgerRepository, VoteLedgerRepository>();
        services.AddScoped<ElectionService>();
        services.AddScoped<VoteService>();
        return services;
    }
}