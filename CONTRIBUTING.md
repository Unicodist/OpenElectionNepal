# Contributing to OpenElectionNepal

Thank you for your interest in contributing to OpenElectionNepal! This project aims to provide a secure, open-source, blockchain-based election software to ensure fair and transparent elections while maintaining voter anonymity. We welcome contributions from the community to help improve and expand the project.

## How to Contribute

### 1. Getting Started
- **Read the Documentation**: Familiarize yourself with the project by reading the [README](README.md) and other documentation in the repository to understand the project architecture, tech stack, and components (Central, Booth, Portal, and Assigner).
- **Set Up the Development Environment**:
  - Clone the repository: `git clone https://github.com/Unicodist/OpenElectionNepal.git`
  - Ensure you have the required tech stack installed:
    - .NET (for backend and background services)
    - Angular 2+ (for frontend)
    - Akka.NET (for distributed actor system)
    - PostgreSQL (for database, primarily used by the Central service)
  - Use an IDE (e.g., Visual Studio, Rider, or VS Code) to work on the .NET projects (`OpenElection.Central`, `OpenElection.Booth`, `OpenElection.Portal`).
  - Follow the instructions in the README to run the projects locally.

### 2. Finding Issues to Work On
- Check the [Issues](https://github.com/Unicodist/OpenElectionNepal/issues) tab for open issues labeled with `help wanted` or `good first issue`.
- If you have an idea for a new feature or improvement, create a new issue to discuss it with the maintainers before starting work.

### 3. Making Changes
- **Fork the Repository**: Create a personal fork of the repository to work on your changes.
- **Create a Branch**: Use a descriptive branch name, e.g., `feature/add-voter-auth` or `bugfix/ledger-sync-issue`.
- **Follow Coding Guidelines**:
  - Write clean, readable, and well-documented code.
  - Adhere to the existing code style and conventions in the project.
  - Ensure your code is secure, especially given the project's focus on election integrity and voter anonymity.
  - Write unit tests for new functionality or bug fixes where applicable.
- **Test Your Changes**:
  - Run the project locally to verify your changes.
  - Ensure all existing tests pass and add new tests if necessary.
  - Test the interactions between components (e.g., Central, Booth, Portal) to ensure compatibility.
- **Commit Your Changes**:
  - Write clear, concise commit messages (e.g., `Add voter hash generation to Assigner service`).
  - Reference relevant issue numbers in your commit messages or pull request (e.g., `Fixes #123`).

### 4. Submitting a Pull Request (PR)
- Push your changes to your fork and create a pull request against the `main` branch of the `Unicodist/OpenElectionNepal` repository.
- Provide a detailed description of your changes in the PR, including:
  - What the changes do and why they are necessary.
  - Any issues the PR addresses (e.g., `Closes #123`).
  - Any additional context or screenshots (if applicable).
- Ensure your PR passes all CI checks (if configured).
- Be responsive to feedback from maintainers during the review process.

### 5. Code Review Process
- Maintainers will review your PR and may request changes or clarifications.
- Address feedback promptly to keep the review process moving.
- Once approved, your changes will be merged into the main branch.

## Contribution Areas
We welcome contributions in the following areas:
- **Code Development**: Implementing features or fixing bugs in the Central, Booth, Portal, or Assigner applications.
- **Testing**: Writing and improving unit tests, integration tests, or end-to-end tests.
- **Documentation**: Enhancing the README, code comments, or creating guides for setup, deployment, or usage.
- **Security**: Improving the security of the blockchain ledger, voter anonymity, or authentication mechanisms (e.g., MFA for Assigner).
- **UI/UX**: Enhancing the Angular-based frontend for the Booth or Portal applications.
- **Performance**: Optimizing the performance of the .NET backend, Akka.NET actors, or PostgreSQL queries.

## Community Guidelines
- Be respectful and inclusive in all interactions.
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md) (if available, or adhere to general open-source community standards).
- Reach out to maintainers via issues or discussions if you have questions or need guidance.

## Development Tips
- **Central Service**: Focus on robust handling of vote requests and blockchain hash assignment. Ensure scalability for multiple Central nodes.
- **Booth Application**: Test voter interaction flows and ledger synchronization thoroughly.
- **Portal Application**: Ensure the public-facing interface is intuitive and secure for downloading and verifying vote ledgers.
- **Assigner Service**: Since this is not yet implemented, contributions here are highly valuable. Focus on secure voter hash generation and MFA integration.
- **Blockchain**: Ensure the blockchain ledger maintains integrity and anonymity while being performant.

## Questions?
If you have questions or need help, feel free to:
- Open an issue with the `question` label.
- Join the community discussion (if a discussion forum or chat is available).
- Reach out to the maintainers via GitHub.

Thank you for contributing to OpenElectionNepal and helping build a secure, transparent election system!
