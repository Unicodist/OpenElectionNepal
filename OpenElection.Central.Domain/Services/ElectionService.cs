using OpenElection.Central.Domain.Dtos;
using OpenElection.Central.Domain.Entities;
using OpenElection.Central.Domain.Helpers;
using OpenElection.Central.Domain.Repositories;

namespace OpenElection.Central.Domain.Services;

public class ElectionService(IBoothRepository boothRepository,IBoothStateRepository boothStateRepository)
{
    public async Task UpdateBoothState(BoothStateUpdateDto dto)
    {
        var boothState = await boothStateRepository.GetByBoothIdAsync(dto.BoothId);
        if (boothState == null)
        {
            var newState = dto.ToEntity();
            await boothStateRepository.InsertAsync(newState);
        }
        else
        {
            boothState.Update(dto.BoothState);
            await boothStateRepository.UpdateAsync(boothState);
        }
    }
}