using System.Reflection;
using OpenElection.Central.Domain.Exceptions;

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

    public static ICollection<T> GetAllAsync<T>() where T : BaseEnum
    {
        var fields = typeof(T).GetFields(BindingFlags.Static | BindingFlags.Public)
            .Where(f => f.FieldType == typeof(T));
        return fields.Select(f => f.GetValue(null)).Cast<T>().ToList();
    }

    public static bool TryParse<T>(string key, out T? o) where T : BaseEnum
    {
        var allFields = GetAllAsync<T>();
        o = allFields.FirstOrDefault(f => f.Id == key);
        return o != null;
    }

    public static T ForceParse<T>(string state) where T : BaseEnum
    {
        var allFields = GetAllAsync<T>();
        var parsed = allFields.FirstOrDefault(f => f.Id == state) ??
                     throw new AppBaseException($"Cannot parse value {state} for enum {typeof(T).Name}");
        return parsed;
    }
}