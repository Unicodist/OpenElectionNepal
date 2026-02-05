# OpenElectionNepal Project Documentation

This directory contains comprehensive documentation for each project unit within OpenElectionNepal.

## Project Structure

OpenElectionNepal is organized into the following main units:

### Backend Services
- **[OpenElection.Booth](./projects/OpenElection.Booth.md)** - Voting booth service for casting votes
- **[OpenElection.Central](./projects/OpenElection.Central.md)** - Central election management service
- **[OpenElection.Portal](./projects/OpenElection.Portal.md)** - Election portal for administration

### Core Libraries
- **[OpenElection.Central.Domain](./projects/OpenElection.Central.Domain.md)** - Core domain models and entities
- **[OpenElection.Central.Infrastructure](./projects/OpenElection.Central.Infrastructure.md)** - Data access and infrastructure
- **[OpenElection.Microservice](./projects/OpenElection.Microservice.md)** - Shared microservice base classes
- **[OpenElection.HealthChecks](./projects/OpenElection.HealthChecks.md)** - Health check utilities

### Frontend Applications
- **[openelection.booth.web](./projects/openelection.booth.web.md)** - Booth application UI (React/Vite)
- **[openelection.portal.web](./projects/openelection.portal.web.md)** - Portal application UI (Angular)

### Infrastructure
- **[Kubernetes Configuration](./infrastructure/kubernetes.md)** - K8s deployment configs
- **[Docker & Containerization](./infrastructure/docker.md)** - Docker setup and best practices
- **[Database](./infrastructure/database.md)** - Database schema and migrations

## Quick Navigation

### For Backend Developers
1. Start with [Project Overview](#project-overview)
2. Review relevant service documentation
3. Check [Architecture Guide](./architecture.md)
4. Reference [API Documentation](./api.md)

### For Frontend Developers
1. Start with [Project Overview](#project-overview)
2. Review frontend application docs
3. Check [Architecture Guide](./architecture.md)
4. Reference [Frontend Guide](./frontend.md)

### For DevOps/Infrastructure
1. Check [Infrastructure](./infrastructure/)
2. Review [Deployment Guide](./deployment.md)
3. Reference [Kubernetes Configs](./infrastructure/kubernetes.md)

## Project Overview

### Purpose
OpenElectionNepal is an election management system designed to facilitate transparent, secure, and efficient election processes. It provides tools for voting, vote tallying, result verification, and election administration.

### Technology Stack
- **Backend:** .NET Core, C#, ASP.NET Core
- **Frontend:** TypeScript, React, Angular
- **Architecture:** Microservices with Akka.NET actors
- **Database:** Entity Framework Core, PostgreSQL (typical)
- **Containerization:** Docker, Kubernetes
- **Communication:** RESTful APIs, Actor-based messaging

### Key Features
- Distributed voting booths with offline capability
- Real-time vote counting and aggregation
- Multi-layered election administration
- Security and audit trails
- Scalable microservices architecture

## Documentation Index

### Core Documentation
- [Architecture Overview](./architecture.md) - System architecture and design patterns
- [API Reference](./api.md) - REST API endpoints and contracts
- [Database Schema](./infrastructure/database.md) - Database structure and relationships
- [Deployment Guide](./deployment.md) - How to deploy and configure services

### Development Guides
- [Development Setup](./development-setup.md) - Local development environment
- [Coding Standards](./coding-standards.md) - Project conventions and best practices
- [Testing Guide](./testing.md) - Testing strategies and tools
- [Frontend Guide](./frontend.md) - Frontend development best practices

### Operations
- [Kubernetes Deployment](./infrastructure/kubernetes.md) - K8s configuration and deployment
- [Docker Guide](./infrastructure/docker.md) - Container management
- [Monitoring & Logging](./operations/monitoring.md) - Observability setup
- [Troubleshooting](./operations/troubleshooting.md) - Common issues and solutions

### Reference
- [Glossary](./glossary.md) - Project terminology
- [Acronyms](./acronyms.md) - Common abbreviations
- [External Links](./links.md) - Useful resources

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Open-Source-Nep/OpenElectionNepal.git
   cd OpenElectionNepal
   ```

2. **Review documentation**
   - Start with [Architecture Overview](./architecture.md)
   - Check relevant project documentation

3. **Set up development environment**
   - Follow [Development Setup](./development-setup.md)
   - Ensure all dependencies are installed

4. **Familiarize with codebase**
   - Review the project unit you'll be working on
   - Check [Coding Standards](./coding-standards.md)

5. **Start contributing**
   - Pick an issue from the repository
   - Follow [Templates](./.github/templates/) for documentation
   - Use agents for guidance (Dev, Reviewer, TPO)

## Contributing

Before contributing, please:
1. Read [CONTRIBUTING.md](../CONTRIBUTING.md)
2. Review relevant documentation
3. Follow project [Coding Standards](./coding-standards.md)
4. Use the [Templates](./.github/templates/) for consistent documentation

## Support

For questions or issues:
- Check the [Troubleshooting](./operations/troubleshooting.md) guide
- Review [FAQ](./faq.md)
- Open an issue on GitHub

---

**Last Updated:** 2026-02-05  
**Maintainer:** OpenElectionNepal Team
