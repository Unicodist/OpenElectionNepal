using OpenElection.Central.Domain.Enums;

namespace OpenElection.Central.Domain.Entities;

public class Booth
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string BoothCode { get; set; }
    public BoothState BoothState { get; set; }

    public void UpdateState(BoothState state)
    {
        BoothState = state;
    }
}