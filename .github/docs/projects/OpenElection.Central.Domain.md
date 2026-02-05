# OpenElection.Central.Domain

**Type:** Class Library  
**Purpose:** Core domain models, entities, and business logic  
**Location:** `/OpenElection.Central.Domain/`

## Overview

OpenElection.Central.Domain contains the core business domain models, entities, enums, DTOs, and repositories interfaces. This library defines the entities that represent the election domain and is used across all services.

## Responsibilities

- **Entity Definitions:** Core domain entities (Election, Vote, Candidate, etc.)
- **Enums:** Election-related enumerations and status codes
- **Value Objects:** Immutable domain value objects
- **Repository Interfaces:** Data access contracts
- **DTOs:** Data transfer objects for service communication
- **Domain Services:** Core business logic implementations
- **Exceptions:** Domain-specific exceptions

## Directory Structure

```
OpenElection.Central.Domain/
├── Entities/
│   ├── Election.cs
│   ├── Candidate.cs
│   ├── Vote.cs
│   ├── Booth.cs
│   └── [Other entities]
├── Enums/
│   ├── ElectionStatus.cs
│   ├── VoteStatus.cs
│   ├── BoothStatus.cs
│   └── [Other enums]
├── Dtos/
│   ├── VoteDto.cs
│   ├── ResultDto.cs
│   ├── CandidateDto.cs
│   └── [Other DTOs]
├── Repositories/
│   ├── IVoteRepository.cs
│   ├── IElectionRepository.cs
│   ├── ICandidateRepository.cs
│   └── [Other repository interfaces]
├── Services/
│   ├── IVoteValidationService.cs
│   ├── IResultCalculationService.cs
│   └── [Other service interfaces]
├── Exceptions/
│   ├── InvalidVoteException.cs
│   ├── ElectionNotFoundException.cs
│   └── [Other custom exceptions]
├── Helpers/
│   └── [Helper utilities]
└── OpenElection.Central.Domain.csproj
```

## Key Entities

### Election
Represents an election event with configuration and timeline.
```csharp
public class Election
{
    public int Id { get; set; }
    public string Name { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public ElectionStatus Status { get; set; }
    public ICollection<Candidate> Candidates { get; set; }
    public ICollection<Booth> Booths { get; set; }
}
```

### Candidate
Represents a candidate in the election.
```csharp
public class Candidate
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Party { get; set; }
    public int ElectionId { get; set; }
    public Election Election { get; set; }
    public ICollection<Vote> Votes { get; set; }
}
```

### Vote
Represents a single vote cast.
```csharp
public class Vote
{
    public int Id { get; set; }
    public int CandidateId { get; set; }
    public Candidate Candidate { get; set; }
    public int BoothId { get; set; }
    public Booth Booth { get; set; }
    public DateTime CastTime { get; set; }
    public VoteStatus Status { get; set; }
}
```

### Booth
Represents a voting booth location.
```csharp
public class Booth
{
    public int Id { get; set; }
    public string Code { get; set; }
    public string Location { get; set; }
    public BoothStatus Status { get; set; }
    public int ElectionId { get; set; }
    public Election Election { get; set; }
    public ICollection<Vote> Votes { get; set; }
}
```

## Key Enums

### ElectionStatus
- Pending
- Active
- Paused
- Completed
- Cancelled

### VoteStatus
- Submitted
- Verified
- Counted
- Invalid

### BoothStatus
- Offline
- Online
- Paused
- Closed

## Repository Interfaces

All repository interfaces define contracts for data access operations:

```csharp
public interface IVoteRepository
{
    Task<Vote> GetByIdAsync(int id);
    Task<IEnumerable<Vote>> GetByCandidateAsync(int candidateId);
    Task<IEnumerable<Vote>> GetByBoothAsync(int boothId);
    Task AddAsync(Vote vote);
    Task UpdateAsync(Vote vote);
    Task DeleteAsync(int id);
}
```

## Service Interfaces

Domain services define core business logic contracts:

```csharp
public interface IVoteValidationService
{
    Task<bool> ValidateVoteAsync(Vote vote);
    Task<string> GetValidationErrorAsync(Vote vote);
}

public interface IResultCalculationService
{
    Task<ElectionResults> CalculateResultsAsync(int electionId);
    Task<Dictionary<int, int>> GetCandidateVotesAsync(int electionId);
}
```

## Custom Exceptions

Domain-specific exceptions for error handling:

```csharp
public class InvalidVoteException : Exception { }
public class ElectionNotFoundException : Exception { }
public class DuplicateVoteException : Exception { }
public class InvalidBoothException : Exception { }
```

## DTOs (Data Transfer Objects)

DTOs for service communication:

```csharp
public class VoteDto
{
    public int Id { get; set; }
    public int CandidateId { get; set; }
    public DateTime CastTime { get; set; }
    public VoteStatus Status { get; set; }
}

public class ResultDto
{
    public int CandidateId { get; set; }
    public string CandidateName { get; set; }
    public int VoteCount { get; set; }
    public decimal Percentage { get; set; }
}
```

## Business Rules

### Vote Validation
- Each voter can only vote once per election
- Votes can only be cast during election period
- Votes must be for valid candidates
- Vote encryption must be intact

### Election Management
- Election timeline cannot be changed after start
- Results can only be calculated when election is active or completed
- Candidates cannot be added after election starts
- Booths must be assigned to valid elections

### Result Calculation
- Only count votes with "Verified" status
- Handle partial vote counts for early results
- Finalize results only when election ends
- Maintain vote privacy in all calculations

## Dependencies

### External
- System.* namespaces (core .NET libraries)

### Internal
- None (this is the base domain library)

## Usage

Import the domain in other services:

```csharp
using OpenElection.Central.Domain.Entities;
using OpenElection.Central.Domain.Repositories;
using OpenElection.Central.Domain.Services;
using OpenElection.Central.Domain.Dtos;
```

## Development Guidelines

### Adding a New Entity
1. Define the entity class in Entities/
2. Add repository interface in Repositories/
3. Define related enums in Enums/
4. Create DTOs in Dtos/
5. Add validation logic if needed

### Adding a New Service
1. Define interface in Services/
2. Document business logic
3. Create implementation in Infrastructure
4. Add unit tests
5. Update documentation

## Testing

Domain entities should be tested for:
- Entity validation
- Relationship integrity
- Business rule enforcement
- Exception handling

---

**Last Updated:** 2026-02-05  
**Maintainer:** Development Team  
**Status:** Active
