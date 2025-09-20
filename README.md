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
- Remember there are multiple projects in the solution.
- Use an IDE or browser with cli to projects, "OpenElection.Central", "OpenElection.Booth", "OpenElection.Portal"
- Run individual .NET projects

