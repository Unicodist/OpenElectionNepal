#!/usr/bin/env node

/**
 * Issue Sync Script
 * 
 * Fetches open issues from the parent repository and generates issue documentation.
 * This tool helps TPO agents track and document upstream issues.
 * 
 * Usage:
 *   node sync-issue.js [--repo owner/repo]
 * 
 * Environment Variables:
 *   PARENT_REPO  - Parent repository in format owner/repo (optional, uses default)
 *   GITHUB_TOKEN - GitHub API token (optional, for higher rate limits)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// Configuration
const DEFAULT_PARENT_REPO = 'Open-Source-Nep/OpenElectionNepal'; // Parent repo
const ISSUES_DIR = path.join(__dirname, '..', 'issues');

// Parse command line arguments
const args = process.argv.slice(2);
let parentRepo = process.env.PARENT_REPO || DEFAULT_PARENT_REPO;
const githubToken = process.env.GITHUB_TOKEN || '';

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--repo' && args[i + 1]) {
        parentRepo = args[++i];
    }
}

/**
 * Make HTTPS request to GitHub API
 */
function githubRequest(path, token) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            port: 443,
            path: path,
            method: 'GET',
            headers: {
                'User-Agent': 'OpenElectionNepal-IssueSync',
                'Accept': 'application/vnd.github.v3+json',
            },
        };

        if (token) {
            options.headers['Authorization'] = `token ${token}`;
        }

        https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(new Error(`Failed to parse response: ${e.message}`));
                    }
                } else {
                    reject(new Error(`GitHub API error ${res.statusCode}: ${data}`));
                }
            });
        }).on('error', reject).end();
    });
}

/**
 * Fetch open issues from parent repository
 */
async function fetchOpenIssues(repo) {
    console.log(`\n📦 Fetching open issues from ${repo}...`);
    try {
        const issues = await githubRequest(
            `/repos/${repo}/issues?state=open&per_page=100`,
            githubToken
        );
        console.log(`✅ Found ${issues.length} open issues\n`);
        return issues;
    } catch (error) {
        console.error(`❌ Error fetching issues: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Display issues and let user select one
 */
async function selectIssue(issues) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        console.log('Available Issues:');
        console.log('─'.repeat(80));

        issues.forEach((issue, index) => {
            const labels = issue.labels.map((l) => l.name).join(', ');
            const labelStr = labels ? ` [${labels}]` : '';
            console.log(
                `${String(index + 1).padStart(3)}. #${issue.number} - ${issue.title}${labelStr}`
            );
        });

        console.log('─'.repeat(80));
        rl.question('\nSelect issue number (1-' + issues.length + ', or q to quit): ', (answer) => {
            rl.close();

            if (answer.toLowerCase() === 'q') {
                console.log('Cancelled.');
                process.exit(0);
            }

            const index = parseInt(answer) - 1;

            if (index < 0 || index >= issues.length || isNaN(index)) {
                console.error('❌ Invalid selection');
                process.exit(1);
            }

            resolve(issues[index]);
        });
    });
}

/**
 * Slugify a string for use in branch names
 */
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/-+/g, '-')       // Replace multiple hyphens with single
        .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
}

/**
 * Create a git branch for the issue
 */
function createGitBranch(issue) {
    try {
        // Create branch name: issue-{number}-{slugified-title}
        const branchName = `issue-${issue.number}-${slugify(issue.title)}`;

        // Check if git is available
        try {
            execSync('git --version', { stdio: 'ignore' });
        } catch (e) {
            console.log('\n⚠️  Git not found. Skipping branch creation.');
            return null;
        }

        // Check current branch to ensure we're in a git repo
        try {
            execSync('git rev-parse --git-dir', { stdio: 'ignore' });
        } catch (e) {
            console.log('\n⚠️  Not a git repository. Skipping branch creation.');
            return null;
        }

        // Create and checkout the branch
        console.log(`\n🌿 Creating git branch: ${branchName}`);
        execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });
        console.log(`✅ Branch created and checked out successfully`);

        return branchName;
    } catch (error) {
        console.error(`\n⚠️  Failed to create branch: ${error.message}`);
        console.log('   You can create the branch manually if needed.');
        return null;
    }
}

/**
 * Generate markdown content for issue
 */
function generateIssueMarkdown(issue, repo) {
    const labels = issue.labels.map((l) => l.name).join(', ');
    const assignees = issue.assignees.map((a) => a.login).join(', ');
    const milestone = issue.milestone ? issue.milestone.title : 'None';

    const markdown = `# Issue #${issue.number}: ${issue.title}

**Status:** ${issue.state.toUpperCase()}  
**Created:** ${new Date(issue.created_at).toISOString().split('T')[0]}  
**Updated:** ${new Date(issue.updated_at).toISOString().split('T')[0]}  
**URL:** [${repo}#${issue.number}](${issue.html_url})

## Details

| Field | Value |
|-------|-------|
| **Labels** | ${labels || 'None'} |
| **Assignees** | ${assignees || 'Unassigned'} |
| **Milestone** | ${milestone} |
| **Comments** | ${issue.comments} |

## Description

${issue.body || '*No description provided*'}

## Related Information

- **User:** [@${issue.user.login}](${issue.user.html_url})
- **Repository:** ${repo}
- **Issue Link:** ${issue.html_url}

---

*This file was auto-generated by the issue sync script. Last updated: ${new Date().toISOString()}*
`;

    return markdown;
}

/**
 * Save issue documentation
 */
function saveIssueDocumentation(issue, repo, markdown) {
    const issueDir = path.join(ISSUES_DIR, `${issue.number}`);

    // Create directory if it doesn't exist
    if (!fs.existsSync(issueDir)) {
        fs.mkdirSync(issueDir, { recursive: true });
        console.log(`📁 Created directory: ${issueDir}`);
    }

    const filePath = path.join(issueDir, 'ISSUE.md');
    fs.writeFileSync(filePath, markdown, 'utf8');
    console.log(`✅ Saved issue documentation to: ${filePath}`);

    // Also create a metadata JSON file
    const metadataPath = path.join(issueDir, 'metadata.json');
    const metadata = {
        number: issue.number,
        title: issue.title,
        state: issue.state,
        url: issue.html_url,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        labels: issue.labels.map((l) => l.name),
        assignees: issue.assignees.map((a) => a.login),
        comments: issue.comments,
        synced_at: new Date().toISOString(),
    };

    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
    console.log(`✅ Saved metadata to: ${metadataPath}`);
}

/**
 * Main execution
 */
async function main() {
    console.log('╔════════════════════════════════════════╗');
    console.log('║  OpenElectionNepal Issue Sync Tool     ║');
    console.log('╚════════════════════════════════════════╝');

    try {
        // Fetch issues
        const issues = await fetchOpenIssues(parentRepo);

        if (issues.length === 0) {
            console.log('ℹ️  No open issues found.');
            process.exit(0);
        }

        // Select issue
        const selectedIssue = await selectIssue(issues);
        console.log(`\n✨ Selected: #${selectedIssue.number} - ${selectedIssue.title}\n`);

        const branchName = createGitBranch(selectedIssue);

        // Generate markdown
        const markdown = generateIssueMarkdown(selectedIssue, parentRepo);

        // Save documentation
        saveIssueDocumentation(selectedIssue, parentRepo, markdown);

        console.log('\n✨ Issue sync completed successfully!');
        console.log(`📖 View the documentation at: .github/issues/${selectedIssue.number}/ISSUE.md`);
        if (branchName) {
            console.log(`🌿 Working on branch: ${branchName}`);
        }
    }
    catch (error) {
        console.error(`❌ An error occurred: ${error.message}`);
        process.exit(1);
    }
}
main();
