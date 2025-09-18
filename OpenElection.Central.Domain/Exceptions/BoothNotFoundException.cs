namespace OpenElection.Central.Domain.Exceptions;

public class BoothNotFoundException(string message = "The booth is not found"): AppBaseException(message);