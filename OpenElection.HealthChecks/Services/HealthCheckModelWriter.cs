using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace OpenElection.HealthChecks.Services;

public static class HealthCheckModelWriter
{
    public static HealthcheckResponse FormatResponse(HealthReport healthcheckResult)
    {
        var response = new HealthcheckResponse
        {
            Status = healthcheckResult.Status.ToString(),
            Timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),
            Checks = healthcheckResult.Entries.Select(entry => new
            {
                name = entry.Key,
                status = entry.Value.Status.ToString(),
                description = entry.Value.Description,
                duration = entry.Value.Duration.TotalMilliseconds
            }).ToList<dynamic>()
        };

        return response;
    }
}