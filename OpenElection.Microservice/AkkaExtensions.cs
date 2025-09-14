using Akka.Actor;
using Akka.Cluster.Hosting;
using Akka.DependencyInjection;
using Akka.Hosting;
using Akka.Remote.Hosting;
using Akka.Routing;
using Microsoft.Extensions.DependencyInjection;
using Petabridge.Cmd.Cluster;
using Petabridge.Cmd.Host;
using Petabridge.Cmd.Remote;

namespace OpenElection.Microservice;

public static class AkkaExtensions
{
    public static IServiceCollection RegisterWithCentralSystem(this IServiceCollection services,
        AkkaOptions akkaOptions, Action<ActorSystem, IActorRegistry, IDependencyResolver> actorStarter)
    {
        services.AddAkka(AkkaConstants.CentralSystemName, builder =>
        {
            builder.AddHoconFile("akka.hocon",HoconAddMode.Prepend)
                .WithRemoting(akkaOptions.RemoteOptions)
                .WithClustering(akkaOptions.ClusterOptions)
                .AddPetabridgeCmd(akkaOptions.PetabridgeCmdOptions, cmd =>
                {
                    cmd.RegisterCommandPalette(ClusterCommands.Instance);
                    cmd.RegisterCommandPalette(new RemoteCommands());
                })
                .WithActors(actorStarter);
        });

        return services;
    }

    public static IActorRef CreateRoutedActor<T>(this ActorSystem system, IDependencyResolver resolver, string name, int nrOfInstances) where T : ActorBase
    {
        var props = resolver.Props<T>().WithRouter(new RoundRobinPool(nrOfInstances));
        return system.ActorOf(props, name);
    }

    public static IActorRef CreateRemoteActor(this ActorSystem system, string name)
    {
        var props = Props.Empty.WithRouter(FromConfig.Instance);
        return system.ActorOf(props, name);
    }
}