using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OpenElection.HealthChecks.Services;

namespace OpenElection.HealthChecks;

public class HealthCheckBackgroundService(
    IConfiguration configuration,
    ILogger<HealthCheckBackgroundService> logger,
    HealthCheckService healthCheckService)
    : BackgroundService
{
    private readonly string _healthcheckOutputDir = configuration["Healthcheck:OutputDir"] ?? "";
    private readonly int _healthcheckIntervalSeconds = int.TryParse(configuration["Healthcheck:IntervalSeconds"], out var interval) ? interval : 10;

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (!Directory.Exists(_healthcheckOutputDir) && !string.IsNullOrEmpty(_healthcheckOutputDir))
        {
            Directory.CreateDirectory(_healthcheckOutputDir);
        }

        var healthcheckFilePath = Path.Combine(_healthcheckOutputDir, "healthcheck.json");
        return Task.Run(async () =>
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var healthcheckResult = await healthCheckService.CheckHealthAsync(stoppingToken);
                    var healthcheckJson = JsonSerializer.Serialize(HealthCheckModelWriter.FormatResponse(healthcheckResult), new JsonSerializerOptions()
                    {
                        WriteIndented = true
                    });
                    await File.WriteAllTextAsync(healthcheckFilePath, healthcheckJson, stoppingToken);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Healthcheck failed");
                }
                await Task.Delay(TimeSpan.FromSeconds(_healthcheckIntervalSeconds), stoppingToken);
            }
        }, stoppingToken);
    }
}