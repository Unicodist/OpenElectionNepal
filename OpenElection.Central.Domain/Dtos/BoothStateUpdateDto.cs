using OpenElection.Central.Domain.Enums;

namespace OpenElection.Central.Domain.Dtos;

public record BoothStateUpdateDto(Guid BoothId, BoothState BoothState);