# Metadata Template

Use this template to create consistent metadata.json files for tracking issue and pull request information.

**Used by:** TPO Agent for creating issue metadata  
**Output Location:** `.github/issues/{issue_number}/metadata.json`

## Template Structure

```json
{
  "number": "{issue_number}",
  "title": "{issue_title}",
  "status": "{open|in_progress|in_review|closed}",
  "type": "{feature|bug|enhancement|documentation|task|question}",
  "priority": "{critical|high|medium|low}",
  "url": "{issue_html_url}",
  "created_at": "{ISO_8601_timestamp}",
  "updated_at": "{ISO_8601_timestamp}",
  "closed_at": "{ISO_8601_timestamp_or_null}",
  "labels": [
    "{label1}",
    "{label2}"
  ],
  "assignees": [
    {
      "login": "{username}",
      "avatar_url": "{avatar_url}"
    }
  ],
  "description": "{issue_body}",
  "comments_count": {count},
  "components": [
    "{component1}",
    "{component2}"
  ],
  "dependencies": {
    "blocks": [
      {issue_number}
    ],
    "blocked_by": [
      {issue_number}
    ],
    "related_to": [
      {issue_number}
    ]
  },
  "effort": {
    "estimate": "{story_points_or_hours}",
    "unit": "{points|hours}"
  },
  "milestone": {
    "title": "{milestone_name_or_null}",
    "due_date": "{ISO_8601_date_or_null}"
  },
  "acceptance_criteria": [
    "{criterion1}",
    "{criterion2}"
  ],
  "branch_created": "{branch_name_or_null}",
  "pr_created": "{pr_number_or_null}",
  "synced_at": "{ISO_8601_timestamp}",
  "last_synced_from": "{source_repo}"
}
```

## Field Descriptions

### Core Fields
- **number**: Issue number (string for tracking)
- **title**: Issue title
- **status**: Current issue status
- **type**: Issue type classification
- **priority**: Priority level
- **url**: Direct link to issue on GitHub
- **created_at**: When issue was created (ISO 8601 format)
- **updated_at**: Last update timestamp
- **closed_at**: When issue was closed (null if open)

### People & Assignment
- **assignees**: Array of assigned users
  - login: GitHub username
  - avatar_url: User avatar image URL

### Organization
- **labels**: Array of label strings
- **components**: Array of affected components
- **milestone**: Milestone information
  - title: Milestone name
  - due_date: Expected completion date

### Relationships
- **dependencies**: Issue relationships
  - blocks: Issues this one blocks
  - blocked_by: Issues blocking this one
  - related_to: Related issues

### Estimation & Effort
- **effort**: Estimated effort
  - estimate: Numeric value
  - unit: "points" or "hours"

### Acceptance & Tracking
- **acceptance_criteria**: Array of acceptance criteria
- **description**: Full issue description/body
- **comments_count**: Number of comments

### Integration
- **branch_created**: Git branch name (if created)
- **pr_created**: Pull request number (if created)
- **synced_at**: When this metadata was last updated
- **last_synced_from**: Source repository (for forked projects)

## Minimal Example

```json
{
  "number": "123",
  "title": "Add user authentication",
  "status": "open",
  "type": "feature",
  "priority": "high",
  "url": "https://github.com/Open-Source-Nep/OpenElectionNepal/issues/123",
  "created_at": "2026-02-05T10:00:00Z",
  "updated_at": "2026-02-05T10:00:00Z",
  "closed_at": null,
  "labels": ["backend", "auth"],
  "assignees": [
    {
      "login": "developer1",
      "avatar_url": "https://avatars.githubusercontent.com/u/123?v=4"
    }
  ],
  "components": ["OpenElection.Central", "OpenElection.Portal"],
  "synced_at": "2026-02-05T10:30:00Z",
  "last_synced_from": "Open-Source-Nep/OpenElectionNepal"
}
```

## Complete Example

```json
{
  "number": "456",
  "title": "Optimize vote counting performance",
  "status": "in_progress",
  "type": "enhancement",
  "priority": "high",
  "url": "https://github.com/Open-Source-Nep/OpenElectionNepal/issues/456",
  "created_at": "2026-02-01T08:00:00Z",
  "updated_at": "2026-02-05T14:30:00Z",
  "closed_at": null,
  "labels": ["performance", "central-service", "optimization"],
  "assignees": [
    {
      "login": "developer1",
      "avatar_url": "https://avatars.githubusercontent.com/u/123?v=4"
    },
    {
      "login": "developer2",
      "avatar_url": "https://avatars.githubusercontent.com/u/456?v=4"
    }
  ],
  "description": "The vote counting process in OpenElection.Central is slow...",
  "comments_count": 5,
  "components": [
    "OpenElection.Central",
    "OpenElection.Central.Infrastructure"
  ],
  "dependencies": {
    "blocks": [789],
    "blocked_by": [654],
    "related_to": [123, 321]
  },
  "effort": {
    "estimate": "8",
    "unit": "points"
  },
  "milestone": {
    "title": "v1.2.0",
    "due_date": "2026-03-15"
  },
  "acceptance_criteria": [
    "Vote counting completes in < 2 seconds for 100k votes",
    "Query optimization documented",
    "Performance benchmarks included in PR"
  ],
  "branch_created": "issue-456-optimize-vote-counting-performance",
  "pr_created": null,
  "synced_at": "2026-02-05T14:35:00Z",
  "last_synced_from": "Open-Source-Nep/OpenElectionNepal"
}
```

## Usage in Automation

### Reading Metadata
```javascript
const metadata = JSON.parse(fs.readFileSync('.github/issues/456/metadata.json'));
console.log(`Issue #${metadata.number}: ${metadata.title}`);
console.log(`Status: ${metadata.status}`);
console.log(`Assigned to: ${metadata.assignees.map(a => a.login).join(', ')}`);
```

### Updating Metadata
```javascript
metadata.status = 'in_progress';
metadata.branch_created = 'issue-456-optimize-vote-counting';
metadata.updated_at = new Date().toISOString();
fs.writeFileSync('.github/issues/456/metadata.json', JSON.stringify(metadata, null, 2));
```

## Best Practices

✅ Do:
- Keep metadata in sync with GitHub
- Use ISO 8601 format for dates
- Update whenever issue changes
- Include all relevant labels
- Maintain relationship links
- Use null for optional empty fields

❌ Don't:
- Manually edit metadata if automated updates available
- Omit required fields
- Use non-standard date formats
- Leave relationships incomplete
- Lose relationship information

---

*Template Version: 1.0*  
*Last Updated: 2026-02-05*
