using Akka.Cluster.Hosting;
using Akka.Remote.Hosting;
using Petabridge.Cmd.Host;

namespace OpenElection.Microservice;

public class AkkaOptions
{
    public RemoteOptions RemoteOptions { get; set; }
    public ClusterOptions ClusterOptions { get; set; }
    public PetabridgeCmdOptions PetabridgeCmdOptions { get; set; }
}