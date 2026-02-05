# GitHub Templates Guide

This directory contains standard templates for maintaining consistent documentation and communication within the OpenElectionNepal project.

## Available Templates

### 1. Issue Template
**File:** `ISSUE.md`  
**Purpose:** Document issues, features, bugs with comprehensive details  
**Used By:** TPO Agent  
**Use When:** Creating issue documentation  
**Key Sections:**
- Issue type and priority
- Description and acceptance criteria
- Technical details and components
- Implementation plan
- Questions needing clarification

See [ISSUE.md](./ISSUE.md) for complete template.

### 2. Metadata Template
**File:** `METADATA.md`  
**Purpose:** Structured JSON metadata for issues  
**Used By:** TPO Agent  
**Use When:** Creating issue metadata  
**Key Sections:**
- Issue core information
- People and assignments
- Organization and relationships
- Effort estimation
- Integration tracking

See [METADATA.md](./METADATA.md) for complete template.

### 3. Code Review Template
**File:** `REVIEW.md`  
**Purpose:** Conduct structured code reviews during development  
**Use When:** Reviewing changes before final commit  
**Key Sections:**
- Architecture and design review
- Implementation quality check
- Testing validation
- Security assessment
- Performance analysis
- Documentation verification

See [REVIEW.md](./REVIEW.md) for complete template.

### 4. Revision Template
**File:** `REVISION.md`  
**Purpose:** Document changes made after review feedback  
**Use When:** Implementing reviewer feedback and improvements  
**Key Sections:**
- Review feedback summary
- Blocking issues addressed
- Non-blocking improvements
- Changes not addressed (with reasons)
- Verification checklist

See [REVISION.md](./REVISION.md) for complete template.

### 5. Commit Message Template
**File:** `COMMIT-MESSAGE.md`  
**Purpose:** Write clear, consistent commit messages  
**Use When:** Committing code to git  
**Key Sections:**
- Type (feat, fix, docs, etc.)
- Scope (what component)
- Subject (clear description)
- Body (what and why)
- Footer (breaking changes, issue references)

See [COMMIT-MESSAGE.md](./COMMIT-MESSAGE.md) for complete template.

## Project Documentation

Complete documentation for project units is available in `.github/docs/`:

- **[.github/docs/README.md](./../docs/README.md)** - Main documentation hub
- **[.github/docs/projects/](./../docs/projects/)** - Individual project documentation

See [.github/docs/README.md](./../docs/README.md) for comprehensive project information.

## Template Usage Workflow

### For Issue Work (Using TPO Agent)

1. **Sync Issue**
   ```bash
   node .github/scripts/sync-issue.js
   # Automatically generates ISSUE.md and metadata.json
   ```

2. **Review Generated Documentation**
   - Check `.github/issues/{number}/ISSUE.md`
   - Review `.github/issues/{number}/metadata.json`

3. **Implement Feature Based on Issue**
   - Work on the feature requirements
   - Use commit message template for commits

4. **Request Code Review**
   ```bash
   cp .github/templates/REVIEW.md docs/reviews/feature-pr-review.md
   # Use REVIEW template or share with peer reviewer
   ```

5. **Implement Feedback**
   ```bash
   cp .github/templates/REVISION.md docs/revisions/feature-revision-v1.md
   # Document all changes made after review
   ```

6. **Commit Final Changes**
   - Use COMMIT-MESSAGE template
   - Reference issue number in commit

## Best Practices

### Issue Documentation (ISSUE.md)
✅ Use sync-issue.js to generate automatically  
✅ Keep metadata JSON in sync with markdown  
✅ Update status as work progresses  
✅ Link related issues  
✅ Be specific about acceptance criteria  
❌ Don't manually edit synced content  
❌ Don't lose relationship information

### Issue Metadata (METADATA.md)
✅ Use sync-issue.js to generate JSON automatically  
✅ Update when issue status changes  
✅ Keep branches and PR links current  
✅ Maintain accurate effort estimates  
❌ Don't manually edit auto-generated metadata  
❌ Don't orphan metadata files

### Code Review
✅ Be constructive and respectful  
✅ Ask questions to understand design  
✅ Provide specific suggestions  
✅ Acknowledge good implementations  
❌ Don't just list issues  
❌ Don't use harsh language

### Revision
✅ Document what changed and why  
✅ Address all blocking issues  
✅ Explain decisions on non-blocking items  
✅ Include verification steps  
❌ Don't ignore review feedback  
❌ Don't skip testing after changes

### Commit Messages
✅ Use imperative present tense  
✅ Be specific and concise  
✅ Reference related issues  
✅ Explain the "why"  
❌ Don't use vague messages  
❌ Don't mix unrelated changes

## Agent Integration

The GitHub agents use these templates:

- **Dev Agent** - References COMMIT-MESSAGE and issue documentation
- **Reviewer Agent** - Uses REVIEW template for guidance
- **TPO Agent** - Uses ISSUE and METADATA templates for issue documentation

## Customization

Feel free to customize templates for your team's needs:

1. Make a copy
2. Modify sections as needed
3. Commit and document changes
4. Share updated template with team

## Template Checklist

When using any template:
- [ ] Review all sections
- [ ] Fill in required fields
- [ ] Adapt to your specific need
- [ ] Proofread for clarity
- [ ] Reference related issues/PRs
- [ ] Save in appropriate location

---

**Last Updated:** 2026-02-05  
**Version:** 2.0