using System.Reflection;

namespace OpenElection.Central.Domain.Enums;

public class BaseEnum
{
    private string Id { get; }
    private string DisplayText { get; }

    protected BaseEnum(string id, string displayText)
    {
        Id = id;
        DisplayText = displayText ?? throw new ArgumentNullException(nameof(displayText));
    }

    public override bool Equals(object? obj)
    {
        if (obj == null || GetType() != obj.GetType())
            return false;

        var other = (BaseEnum)obj;
        return Id == other.Id && DisplayText == other.DisplayText;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Id, DisplayText);
    }

    public string GetKey() => Id;
    public string GetDisplayText() => DisplayText;

    public override string ToString()
    {
        return $"{Id}: {DisplayText}";
    }

    public static ICollection<T> GetAllAsync<T>()
    {
        var fields = typeof(T).GetFields(BindingFlags.Static | BindingFlags.Public).Where(f => f.FieldType == typeof(T));
        return fields.Select(f => f.GetValue(null)).Cast<T>().ToList();
    }

    public static bool TryParse<T>(string key, out T? o) where T : BaseEnum
    {
        var allFields = GetAllAsync<T>();
        o = allFields.FirstOrDefault(f=>f.Id == key);
        return o != null;
    }
}