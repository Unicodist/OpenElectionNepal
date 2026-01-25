namespace OpenElection.HealthChecks.Services;

public interface IDatabaseHealthcheckRepository
{
    Task<TimeSpan> PingAsync();
}