using Microsoft.Extensions.Diagnostics.HealthChecks;
using OpenElection.HealthChecks.Services;

namespace OpenElection.HealthChecks.Checks;

public class DatabaseHealthCheck(IDatabaseHealthcheckRepository healthcheckRepository) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = new CancellationToken())
    {
        var pingResult = await healthcheckRepository.PingAsync();
        return pingResult < TimeSpan.FromSeconds(1) ? HealthCheckResult.Healthy("Database is reachable. (Ping: " + pingResult.TotalMilliseconds + " ms)") : HealthCheckResult.Unhealthy("Database ping took too long.");
    }
}