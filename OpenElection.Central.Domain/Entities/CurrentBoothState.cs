using OpenElection.Central.Domain.Enums;

namespace OpenElection.Central.Domain.Entities;

public class CurrentBoothState
{
    public Guid BoothId { get; set; }
    public BoothState BoothState { get; set; }

    public void Update(BoothState boothState)
    {
        BoothState = boothState;
    }
}