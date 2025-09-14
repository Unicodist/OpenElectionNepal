using Akka.Actor;
using Akka.DependencyInjection;
using Akka.Hosting;
using OpenElection.Microservice;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var centralOptions = builder.Configuration.GetSection("CentralSystem").Get<AkkaOptions>() ??
                     throw new InvalidOperationException("CentralSystem configuration not provided.");
builder.Services.RegisterWithCentralSystem(centralOptions, ActorStarter);

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapControllers();

app.Run();

return;

void ActorStarter(ActorSystem system, IActorRegistry registry, IDependencyResolver resolver)
{
    _ = system.CreateRemoteActor("vote");
}