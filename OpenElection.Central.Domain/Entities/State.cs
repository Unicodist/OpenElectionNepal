namespace OpenElection.Central.Domain.Entities;

public class State
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string StateCode { get; set; }
    public ICollection<District> Districts { get; set; }
}