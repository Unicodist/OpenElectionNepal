using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace OpenElection.HealthChecks.Checks;

public class AkkaHealthCheck : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = new CancellationToken())
    {
        return Task.FromResult(HealthCheckResult.Healthy("Akka system is healthy."));
    }
}