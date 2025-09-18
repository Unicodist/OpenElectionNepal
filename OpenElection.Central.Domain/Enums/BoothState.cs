namespace OpenElection.Central.Domain.Enums;

public class BoothState: BaseEnum
{
    private BoothState(string id, string displayText) : base(id, displayText)
    {
    }

    public static readonly BoothState NotStarted = new("NOT_STARTED","Not Started");
    public static readonly BoothState SettingUp = new("SETTING_UP", "Setting Up");
    public static readonly BoothState Open = new("OPEN", "Open");
    public static readonly BoothState InProgress = new("IN_PROGRESS", "In Progress");
    public static readonly BoothState Started = new("PAUSED", "Paused");
    public static readonly BoothState Closing = new("CLOSING", "Closing");
    public static readonly BoothState Closed = new("CLOSED", "Closed");
    public static readonly BoothState Finalized = new("FINALIZED", "Finalized");
    public static readonly BoothState Voided = new("VOIDED", "Voided");
    
}