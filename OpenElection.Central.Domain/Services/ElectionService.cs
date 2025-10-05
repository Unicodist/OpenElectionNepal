using OpenElection.Central.Domain.Dtos;
using OpenElection.Central.Domain.Entities;
using OpenElection.Central.Domain.Enums;
using OpenElection.Central.Domain.Exceptions;
using OpenElection.Central.Domain.Helpers;
using OpenElection.Central.Domain.Repositories;

namespace OpenElection.Central.Domain.Services;

public class ElectionService(IBoothRepository boothRepository)
{
    public async Task UpdateBoothState(Guid boothId, BoothState state)
    {
        var booth = await boothRepository.GetByIdAsync(boothId) ?? throw new BoothNotFoundException();
        booth.UpdateState(state);
        await boothRepository.UpdateAsync(booth);
    }
}