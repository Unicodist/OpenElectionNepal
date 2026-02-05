# GitHub Scripts

This directory contains utility scripts for managing the OpenElectionNepal project.

## Available Scripts

### sync-issue.js
Synchronizes open issues from the parent repository and generates documentation.

**Purpose:** Help TPO agents track upstream issues and contributions from the parent project.

**Features:**
- Fetches open issues from GitHub API
- Interactive issue selection
- Generates markdown documentation
- Creates metadata files for tracking
- Automatically creates git branches
- Supports custom parent repositories
- Optional GitHub token support for higher rate limits

**Usage:**
```bash
node sync-issue.js
node sync-issue.js --repo owner/repo
GITHUB_TOKEN=ghp_xxxx node sync-issue.js  # Optional, for rate limits
```

**Requirements:**
- Node.js 14+
- No authentication required (works with public repos)
- GitHub token (optional, for higher rate limits and private repos)

**Output:**
- `.github/issues/{issue_number}/ISSUE.md` - Full issue documentation
- `.github/issues/{issue_number}/metadata.json` - Metadata and sync information

**See Also:** [TPO Agent Documentation](../agents/tpo.md#issue-tracking--synchronization)
