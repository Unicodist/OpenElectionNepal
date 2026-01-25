using Microsoft.Extensions.DependencyInjection;
using OpenElection.HealthChecks.Checks;

namespace OpenElection.HealthChecks;

public static class HealthcheckExtension
{
    public static IServiceCollection AddAppHealthChecks(this IServiceCollection services)
    {
        services.AddHealthChecks()
            .AddCheck<DatabaseHealthCheck>("database", tags: ["database", "ready"])
            .AddCheck<AkkaHealthCheck>("akka", tags: ["akka", "ready"]);

        return services;
    }
}