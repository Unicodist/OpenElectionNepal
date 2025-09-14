using Akka.Actor;
using Akka.DependencyInjection;
using Akka.Hosting;
using OpenElection.Central;
using OpenElection.Central.Infrastructure.Actors;
using OpenElection.Microservice;

var builder = Host.CreateApplicationBuilder(args);

var centralOptions = builder.Configuration.GetSection("CentralSystem").Get<AkkaOptions>() ??
                     throw new InvalidOperationException("CentralSystem configuration not provided.");
builder.Services.RegisterWithCentralSystem(centralOptions, ActorStarter);
builder.Services.AddHostedService<Worker>();

var host = builder.Build();
host.Run();
return;

void ActorStarter(ActorSystem system, IActorRegistry registry, IDependencyResolver resolver)
{
    var voteActor = system.CreateRoutedActor<VoteActor>(resolver, "vote", 10);
    registry.TryRegister<VoteActor>(voteActor);
}