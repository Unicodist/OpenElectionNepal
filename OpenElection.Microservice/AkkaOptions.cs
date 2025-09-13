using Akka.Cluster.Hosting;
using Akka.Remote.Hosting;

namespace OpenElection.Microservice;

public class AkkaOptions
{
    public RemoteOptions RemoteOptions { get; set; }
    public ClusterOptions ClusterOptions { get; set; }
    
}