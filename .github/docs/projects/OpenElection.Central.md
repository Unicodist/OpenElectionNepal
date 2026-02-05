# OpenElection.Central Service

**Type:** Backend Service (ASP.NET Core)  
**Purpose:** Central election management and vote aggregation  
**Location:** `/OpenElection.Central/`

## Overview

OpenElection.Central is the core microservice responsible for election management, vote aggregation, result calculation, and coordination of all booth services. It serves as the central hub for election operations.

## Responsibilities

- **Vote Aggregation:** Collect and aggregate votes from all booths
- **Result Calculation:** Calculate election results in real-time
- **Election Management:** Manage election configuration and timeline
- **Booth Coordination:** Coordinate with multiple voting booths
- **Data Reconciliation:** Ensure vote integrity and consistency
- **Result Reporting:** Generate official election results
- **Audit & Verification:** Maintain audit trails and verification logs

## Key Features

✅ Real-time vote aggregation  
✅ Automatic result calculation  
✅ Multi-booth coordination  
✅ Data reconciliation  
✅ Audit trail maintenance  
✅ Result reporting and export

## Architecture

### Actors (Akka.NET)
- Election actor - Manages election state
- Vote processor actor - Processes incoming votes
- Result calculator actor - Calculates results
- Coordinator actor - Coordinates between services

### Components
- DiConfig.cs - Dependency injection configuration
- Election management logic
- Vote aggregation pipeline
- Result calculation engine

## Dependencies

### Internal Services
- OpenElection.Central.Domain - Domain models
- OpenElection.Central.Infrastructure - Data access
- OpenElection.Microservice - Base microservice classes
- OpenElection.HealthChecks - Health monitoring

### External Dependencies
- ASP.NET Core 6+
- Akka.NET - Actor system
- Entity Framework Core - ORM

## Configuration

**appsettings.json:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Database=..."
  },
  "AkkaCluster": {
    "ListeningPort": 5001,
    "SeedNodes": ["akka://..."]
  },
  "Election": {
    "StartTime": "2026-02-15T08:00:00Z",
    "EndTime": "2026-02-15T18:00:00Z"
  }
}
```

## Development

### Building
```bash
dotnet build OpenElection.Central.csproj
```

### Running
```bash
dotnet run --project OpenElection.Central.csproj
```

### Testing
```bash
dotnet test
```

## File Structure

```
OpenElection.Central/
├── Actors/
│   ├── ElectionActor.cs
│   ├── VoteProcessorActor.cs
│   ├── ResultCalculatorActor.cs
│   └── CoordinatorActor.cs
├── Helpers/
│   └── [Helper classes]
├── Program.cs
├── DiConfig.cs
├── appsettings.json
├── akka.hocon
├── Dockerfile
└── OpenElection.Central.csproj
```

## Key Concepts

### Vote Processing
1. Votes received from booths
2. Validated against election rules
3. Aggregated to results
4. Consistency checks performed
5. Results calculated and stored

### Result Calculation
- Real-time result updates
- Support for different vote types
- Threshold calculations
- Result finalization logic

### Election Timeline
- Pre-election setup
- Voting period
- Vote counting
- Result publication
- Post-election operations

## API Endpoints

### Result Queries
```
GET /api/results
GET /api/results/realtime
GET /api/results/final
```

### Election Management
```
GET /api/election/status
POST /api/election/start
POST /api/election/end
```

### Vote Reporting
```
GET /api/votes/summary
GET /api/votes/bydistrict
GET /api/votes/bycandidate
```

## Security Considerations

- 🔐 Verify all incoming votes
- 🔐 Prevent unauthorized result modification
- 🔐 Maintain vote anonymity
- 🔐 Audit all result changes
- 🔐 Secure inter-service communication
- 🔐 Implement access control for sensitive operations

## Performance Considerations

- Use actor system for concurrent processing
- Implement result caching
- Optimize vote aggregation queries
- Monitor real-time result updates
- Handle high-volume vote processing

## Integration Points

- **REST API** - External result queries
- **Akka Messages** - Booth communication
- **Database** - Vote and result storage
- **Health Check Service** - Service monitoring

## Related Services

- **OpenElection.Booth** - Sends votes for aggregation
- **OpenElection.Portal** - Displays results and manages election
- **OpenElection.Central.Domain** - Domain models
- **OpenElection.Central.Infrastructure** - Data persistence

## Common Tasks

### Adding Result Metrics
1. Define metric in domain models
2. Update calculation logic
3. Expose via API endpoint
4. Test calculation accuracy
5. Document in API docs

### Optimizing Vote Processing
1. Profile current performance
2. Identify bottlenecks
3. Implement caching where applicable
4. Use async patterns
5. Monitor improvements

## Troubleshooting

### Issue: Results not updating
**Solution:** Check actor system health, verify vote reception, review calculation logs

### Issue: Vote aggregation delays
**Solution:** Profile processor actors, check database performance, verify network connectivity

### Issue: Inconsistent results
**Solution:** Run data reconciliation, verify calculation logic, check for failed syncs

---

**Last Updated:** 2026-02-05  
**Maintainer:** Development Team  
**Status:** Active
