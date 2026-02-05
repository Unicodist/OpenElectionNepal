# Copilot Instructions

This document provides guidelines for GitHub Copilot when working on the OpenElectionNepal project.

## Project Overview

OpenElectionNepal is an election management system built with:
- **Backend**: .NET/C# (ASP.NET Core)
- **Frontend**: TypeScript/Angular and React with Vite
- **Architecture**: Microservices with Akka.NET for actor-based messaging
- **Infrastructure**: Docker, Kubernetes, and database migrations

## Code Style & Standards

### C# (.NET)
- Follow Microsoft C# coding conventions
- Use async/await patterns for I/O operations
- Implement dependency injection through constructor parameters
- Use SOLID principles and design patterns
- Follow naming conventions: PascalCase for classes/methods, camelCase for variables

### TypeScript/JavaScript
- Use strict TypeScript with proper type annotations
- Follow ESLint configuration defined in the project
- Use async/await for asynchronous operations
- Prefer functional components in React
- Maintain consistent formatting with Prettier

### Database
- Entity Framework Core for data access in .NET
- Migrations should be properly versioned and named
- Database context should be injected via DI container

## Architecture Guidelines

### Microservices
- Keep services loosely coupled
- Use Akka actors for message passing between services
- Implement health checks for each service
- Use configuration files (appsettings.json) for environment-specific settings

### API Development
- Follow RESTful conventions
- Use appropriate HTTP status codes
- Implement request/response models in ApiModels folder
- Add proper error handling and validation

### Web Applications
- Structure components in logical folders
- Maintain clear separation of concerns
- Use TypeScript strict mode
- Implement proper error handling and user feedback

## Common Tasks

### Adding a New API Endpoint
1. Create an ApiModel in the ApiModels folder
2. Create a Controller with appropriate HTTP verbs
3. Implement business logic in the Domain/Services layer
4. Add proper validation and error handling
5. Update documentation

### Database Changes
1. Update Entity models
2. Create a new migration
3. Update repository interfaces and implementations
4. Test with fresh database setup

### Frontend Development
1. Create components in appropriate folders
2. Use TypeScript for type safety
3. Follow the existing project structure
4. Maintain responsive design principles

## Testing

- Write unit tests for business logic
- Test controllers with integration tests
- Include tests with feature implementations
- Use appropriate testing frameworks for each language

## Documentation

- Update README.md for significant changes
- Add XML documentation comments to public APIs
- Document complex algorithms or business logic
- Keep CONTRIBUTING.md updated with processes

## Security

- Never commit secrets or credentials
- Use environment variables for sensitive configuration
- Validate all user inputs
- Follow OWASP guidelines for web security
- Keep dependencies updated

## Performance Considerations

- Optimize database queries (avoid N+1 problems)
- Implement caching where appropriate
- Use async patterns for non-blocking operations
- Monitor and log performance metrics

## Common Paths & Files

- Backend services: `OpenElection.*/`
- Frontend web apps: `openelection.*.web/`
- Domain models: `OpenElection.Central.Domain/`
- Database context: `OpenElection.Central.Infrastructure/`
- Workflows: `.github/workflows/`
- Kubernetes configs: `kube/`

## Questions?

Refer to CONTRIBUTING.md for detailed contribution guidelines.
