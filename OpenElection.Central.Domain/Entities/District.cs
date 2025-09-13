namespace OpenElection.Central.Domain.Entities;

public class District
{
    public long Id { get; set; }
    public string Name { get; set; }
    public long StateId { get; set; }
    public State State { get; set; }
}