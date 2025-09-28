# OpenElection
## Secured, opensource, blockchain based election software

In this documentation, we will explore Project architecture and a brief documentation

### Introduction
- OpenElection is an opensourced, blockchain based election software. 
- It is designed for a fair and transparent election while also ensuring voter anonymity

### Project architecture
- The project consists of 4 major applications. Namely, "Central", "Booth", "Portal" and "Assigner"
- ###### Central 
    - Central system is the main node for the election, it is responsible for accepting new vote requests from nodes and assigning blockchain hashes on them.
    - It is ideally hosted as a single instance but we can deploy multiple "Central" nodes.
- ###### Booth
    - Booth is a web application node that serves two purpose:
        - Allow voters to vote
        - Keep the blockchain ledger for all votes from all locations.
    - A Booth application must be run for each actual voting booth in a voting center.
    - This allows us to install a new booth immediately if one is captured, stolen or broken.
- ###### Portal
    - This is a public web application that allows us to see the vote results after elections are finalized
    - It allows users to download the vote ledger after the election so they can verify the results
- ###### Assigner (Not created yet)
    - This project let's election staff issue a voting card to users which has a voter hash on it.
    - The voters then use the card in the booth and select their options.
    - This can be hosted multiple instances in a voting booth.
    - It requires authentication and authorization with MFA (Can use sometihng like google authenticator)

### Tech stacks
- The project uses the following frameworks:
    - .NET (Backend, Background services)
    - Angular2+
    - [Akka.NET](https://petabridge.com/bootcamp/) (Distributed actor system)
    - PostgreSQL (Database, At this point I can only see the Central service using it.)

### How to run the project?
> Order: PostgreSQL → Central (.NET) → Booth (.NET, multiple instances) → Web Portals (Angular)

#### 0) Prerequisites
- .NET 7 SDK or later
- Node.js 18+ and npm (or yarn)
- Angular CLI (recommended): npm i -g @angular/cli
- Local PostgreSQL instance

#### 1) Clone & Restore
```
git clone https://github.com/Open-Source-Nep/OpenElectionNepal.git
cd OpenElectionNepal
dotnet restore OpenElection.sln
dotnet build OpenElection.sln -c Debug
```

#### 2) Database (PostgreSQL)
```
CREATE DATABASE openelection;
```

- Add connection string in `OpenElection.Central/appsettings.Development.json` under `ConnectionStrings`  
- Or set environment variable (example):  
```
ConnectionStrings__Default=Host=localhost;Port=5432;Database=openelection;Username=postgres;Password=postgres
```

Optional EF Core migration:
```
dotnet tool install --global dotnet-ef
dotnet ef database update --project OpenElection.Central
```

#### 3) Run Central
```
dotnet run --project OpenElection.Central
```

#### 4) Run Booth (multiple instances possible)
```
dotnet run --project OpenElection.Booth --urls http://localhost:5101
dotnet run --project OpenElection.Booth --urls http://localhost:5102
```

#### 5) Run Web Portals
Portal (results, ledger download):
```
cd openelection.portal.web
npm install
npm start
```

Booth Web (voting UI):
```
cd ../openelection.booth.web
npm install
npm start
```

#### 6) Kubernetes (optional)
```
kubectl apply -f kube/
```

#### 7) Troubleshooting
- DB errors → check connection string  
- Port conflicts → change --urls (Booth) or --port (Angular)  
- Package errors → verify SDK/Node versions, use `npm ci`












