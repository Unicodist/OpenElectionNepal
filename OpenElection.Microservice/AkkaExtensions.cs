using Akka.Cluster.Hosting;
using Akka.Hosting;
using Akka.Remote.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Petabridge.Cmd.Cluster;
using Petabridge.Cmd.Host;
using Petabridge.Cmd.Remote;

namespace OpenElection.Microservice;

public static class AkkaExtensions
{
    public static IServiceCollection RegisterWithCentralSystem(this IServiceCollection services, AkkaOptions akkaOptions)
    {
        services.AddAkka(AkkaConstants.CentralSystemName, builder =>
        {
            builder.WithRemoting(akkaOptions.RemoteOptions)
                .WithClustering(akkaOptions.ClusterOptions)
                .AddPetabridgeCmd(cmd =>
                {
                    cmd.RegisterCommandPalette(ClusterCommands.Instance);
                    cmd.RegisterCommandPalette(new RemoteCommands());
                });
        });
        
        return services;
    }
    public static IServiceCollection RegisterWithLocalSystem(this IServiceCollection services, AkkaOptions akkaOptions)
    {
        services.AddAkka(AkkaConstants.LocalSystemName, builder =>
        {
            builder.WithRemoting(akkaOptions.RemoteOptions)
                .WithClustering(akkaOptions.ClusterOptions)
                .AddPetabridgeCmd(cmd =>
                {
                    cmd.RegisterCommandPalette(ClusterCommands.Instance);
                    cmd.RegisterCommandPalette(new RemoteCommands());
                });
        });
        
        return services;
    }
}