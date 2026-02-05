# OpenElection.Booth Service

**Type:** Backend Service (ASP.NET Core)  
**Purpose:** Voting booth service for secure vote casting and management  
**Location:** `/OpenElection.Booth/`

## Overview

OpenElection.Booth is a microservice responsible for managing individual voting booths, handling vote submission, verification, and booth operations. It operates both online and offline with the capability to sync when connectivity is restored.

## Responsibilities

- **Vote Management:** Receive, validate, and store votes
- **Voter Verification:** Verify voter eligibility and prevent double voting
- **Booth Operations:** Manage booth status, availability, and synchronization
- **Vote Encryption:** Ensure vote secrecy through encryption
- **Offline Support:** Queue votes during offline periods for later sync
- **Audit Trails:** Maintain comprehensive logs for security and audit purposes

## Key Features

✅ Offline-capable voting  
✅ Real-time vote submission  
✅ Automatic synchronization  
✅ Vote verification  
✅ Secure vote storage  
✅ Comprehensive audit logs

## Architecture

### Controllers
- **VoteController** - Handle vote submission and processing
- **VerificationController** - Manage voter verification

### API Models
- `VoteRequestApiModel` - Request model for vote submission
- `VerificationRequestModel` - Voter verification request
- `VerificationSuccessResponseModel` - Successful verification response
- `VerificationFailureResponseModel` - Verification failure response

### Key Flows

#### Vote Submission Flow
1. Voter provides credentials
2. Booth verifies voter eligibility
3. Vote is encrypted
4. Vote is stored locally (or queued if offline)
5. Verification response is sent
6. Sync occurs when connectivity available

#### Verification Flow
1. Voter verification request received
2. Check against voter registry
3. Validate voter hasn't already voted
4. Return verification status
5. Log verification attempt

## Dependencies

### Internal Services
- OpenElection.Central - Central election management
- OpenElection.Microservice - Base microservice classes
- OpenElection.HealthChecks - Health monitoring

### External Dependencies
- ASP.NET Core 6+
- Akka.NET - Actor-based messaging

## Configuration

**appsettings.json:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Database=..."
  },
  "AkkaCluster": {
    "ListeningPort": 5000,
    "SeedNodes": ["akka://..."]
  }
}
```

## Development

### Building
```bash
dotnet build OpenElection.Booth.csproj
```

### Running
```bash
dotnet run --project OpenElection.Booth.csproj
```

### Testing
```bash
dotnet test
```

### API Endpoints

#### Vote Submission
```
POST /api/vote
Content-Type: application/json

{
  "voterId": "voter123",
  "encryptedVote": "encrypted_data",
  "boothId": "booth_001"
}
```

#### Voter Verification
```
POST /api/verify
Content-Type: application/json

{
  "voterId": "voter123",
  "boothId": "booth_001"
}
```

## File Structure

```
OpenElection.Booth/
├── Controllers/
│   ├── VoteController.cs
│   └── VerificationController.cs
├── ApiModels/
│   ├── VoteRequestApiModel.cs
│   ├── VerificationRequestModel.cs
│   ├── VerificationSuccessResponseModel.cs
│   └── VerificationFailureResponseModel.cs
├── Helpers/
│   └── MappingHelper.cs
├── Program.cs
├── appsettings.json
├── Dockerfile
└── OpenElection.Booth.csproj
```

## Security Considerations

- 🔐 Votes must be encrypted before storage
- 🔐 Voter identity must be verified
- 🔐 Prevent double voting
- 🔐 Secure booth-to-server communication
- 🔐 Audit all voting activities
- 🔐 Handle offline voting securely

## Performance Considerations

- Use asynchronous operations for I/O
- Implement efficient vote queuing for offline mode
- Cache voter registry locally
- Optimize encryption/decryption
- Monitor booth synchronization performance

## Common Tasks

### Adding a New Vote Type
1. Update vote encryption logic
2. Modify VoteRequestApiModel
3. Update backend processing
4. Test with new vote type
5. Update documentation

### Implementing Offline Sync
1. Design sync queue structure
2. Implement queue persistence
3. Create sync scheduler
4. Handle sync failures gracefully
5. Monitor sync performance

## Troubleshooting

### Issue: Votes not syncing
**Solution:** Check network connectivity, verify Akka cluster connection, review sync logs

### Issue: Verification failures
**Solution:** Validate voter registry, check database connectivity, verify voter data

### Issue: Booth offline
**Solution:** Check booth service health, verify configuration, review error logs

## Related Services

- **OpenElection.Central** - Receives synced votes and aggregate results
- **OpenElection.Portal** - Administers booth configuration and monitoring
- **OpenElection.Microservice** - Provides base infrastructure

## Integration Points

- **REST API** - External vote submission
- **Akka Messages** - Internal service communication
- **Database** - Local vote storage and queuing
- **Health Check Service** - Booth health monitoring

---

**Last Updated:** 2026-02-05  
**Maintainer:** Development Team  
**Status:** Active
