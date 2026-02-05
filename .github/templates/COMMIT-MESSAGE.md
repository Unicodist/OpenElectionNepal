# Commit Message Template

Use this template for writing clear, meaningful commit messages.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Detailed Guidelines

### Type
Must be one of:
- **feat:** A new feature
- **fix:** A bug fix
- **docs:** Documentation only changes
- **style:** Changes that don't affect code meaning (formatting, etc.)
- **refactor:** Code change that neither fixes a bug nor adds a feature
- **perf:** Code change that improves performance
- **test:** Adding or updating tests
- **chore:** Changes to build process, dependencies, or tooling
- **ci:** Changes to CI/CD configuration

### Scope
The scope specifies what part of the codebase is affected:
- Examples: `auth`, `database`, `api`, `ui`, `portal`, `booth`
- Optional but recommended
- Use the component or module name

### Subject
- Use imperative, present tense: "add" not "added" or "adds"
- Don't capitalize first letter
- No period (.) at the end
- Limit to 50 characters
- Be specific and descriptive

### Body
- Use imperative, present tense
- Wrap at 72 characters
- Explain **what** and **why**, not how
- Separate from subject with a blank line
- Include motivation for the change
- Reference related issues

### Footer
Use this section for:
- **Breaking Changes:** Start with `BREAKING CHANGE:`
- **Issue References:** `Fixes #123`, `Closes #456`
- **Related Issues:** `Related to #789`

## Examples

### Simple Commit
```
feat(auth): add password reset functionality

This allows users to reset their forgotten passwords through email verification.

Fixes #123
```

### With Breaking Change
```
refactor(api): change authentication header format

BREAKING CHANGE: Authentication now requires 'Bearer' prefix in Authorization header.
Update all clients to use 'Authorization: Bearer <token>' instead of 'Authorization: <token>'

Closes #456
```

### Bug Fix
```
fix(database): resolve connection pool exhaustion

Implement proper connection closing in the data repository to prevent pool exhaustion
under high load scenarios.

- Close connections explicitly after use
- Add connection timeout handling
- Improve error logging

Fixes #789
Related to #790
```

### Documentation Update
```
docs(readme): add setup instructions for development environment

Add comprehensive guide for developers setting up the project locally.
Include database setup, service configuration, and testing procedures.
```

## Commit Message Checklist
- [ ] Type is specified and appropriate
- [ ] Scope is relevant (if applicable)
- [ ] Subject is clear and concise (≤50 chars)
- [ ] Subject uses imperative mood
- [ ] No period at end of subject
- [ ] Body explains what and why
- [ ] Body wrapped at 72 characters
- [ ] Issue references included
- [ ] Breaking changes noted if applicable
- [ ] Related issues mentioned

## Good Practices
✅ Do:
- Write meaningful commit messages
- Reference issue numbers
- Use consistent formatting
- Explain the reasoning behind changes
- Keep commits focused and atomic
- Include all context needed

❌ Don't:
- Use generic messages ("Update code", "Fix bugs")
- Commit unrelated changes together
- Write vague descriptions
- Forget to reference related issues
- Use uppercase in subject
- End subject with a period

---

*Follow this template to keep the project history clean and maintainable.*
