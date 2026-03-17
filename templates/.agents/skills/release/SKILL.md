---
name: release
description: >
  Execute the version release workflow. Triggered when the user
  requests a version release. Argument: version number (X.Y.Z).
---

# Version Release

Execute the version release workflow for the specified version.

<!-- TODO: Adapt the steps below to your project's release process -->

## Execution Flow

### Step 1: Parse and Validate Version

Extract version from arguments. Must match `X.Y.Z` format.

Parse components:
- MAJOR = X, MINOR = Y, PATCH = Z
- Release version = `X.Y.Z`

If format is invalid, error: "Version format incorrect, expected X.Y.Z (e.g. 1.2.3)"

### Step 2: Verify Clean Workspace

```bash
git status --short
```

If there are uncommitted changes, error: "Workspace has uncommitted changes. Please commit or stash first."

### Step 3: Update Version References

<!-- TODO: Replace with your project's version update steps -->

Search for version references in project files and update them:

```bash
# Find files with version references
# Search for current version pattern
# Update version strings
```

**Common files to update**:
- `package.json` (Node.js)
- `pom.xml` (Maven)
- `setup.py` / `pyproject.toml` (Python)
- `version.go` (Go)
- `README.md` (documentation)
- `SECURITY.md` / `SECURITY.zh-CN.md` (supported version table)

**Exclude from version replacement**:
- `.agents/`, `.agent-workspace/`, `.claude/`, `.codex/`, `.gemini/`, `.opencode/` (AI tool configs)

### Step 4: Create Release Commit

```bash
git add -A
git commit -m "chore: release v{version}"
```

### Step 5: Create Git Tag

```bash
git tag v{version}
```

### Step 6: Manage Milestones

Close the milestone for the released version when it exists, and create the missing planning milestones for the next cycle.

```bash
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

repo="$(gh repo view --json nameWithOwner --jq '.nameWithOwner')"
released_version="${MAJOR}.${MINOR}.${PATCH}"
line_milestone="${MAJOR}.${MINOR}.x"
next_patch_version="${MAJOR}.${MINOR}.$((PATCH + 1))"
next_minor_version="${MAJOR}.$((MINOR + 1)).0"
next_minor_line="${MAJOR}.$((MINOR + 1)).x"

gh api "repos/$repo/milestones?state=all" --paginate \
  --jq '.[] | [.number, .title, .state] | @tsv' > "$tmpdir/milestones.tsv"

created_count=0

ensure_milestone() {
  title="$1"
  description="$2"

  if awk -F '\t' -v target="$title" '$2 == target { found = 1 } END { exit found ? 0 : 1 }' "$tmpdir/milestones.tsv"; then
    echo "Milestone already exists: $title"
    return 0
  fi

  gh api "repos/$repo/milestones" \
    -f title="$title" \
    -f description="$description" \
    -f state="open" >/dev/null

  printf '0\t%s\topen\n' "$title" >> "$tmpdir/milestones.tsv"
  created_count=$((created_count + 1))
  echo "Created milestone: $title"
}

released_number="$(awk -F '\t' -v target="$released_version" '$2 == target { print $1; exit }' "$tmpdir/milestones.tsv")"
released_state="$(awk -F '\t' -v target="$released_version" '$2 == target { print $3; exit }' "$tmpdir/milestones.tsv")"

if [ -n "$released_number" ] && [ "$released_state" = "open" ]; then
  gh api "repos/$repo/milestones/$released_number" -X PATCH -f state="closed" >/dev/null
  released_action="closed"
elif [ -n "$released_number" ]; then
  released_action="already-closed"
else
  released_action="missing"
fi

ensure_milestone "$next_patch_version" "Issues that we want to release in v$next_patch_version."
ensure_milestone "$line_milestone" "Issues that we want to resolve in $MAJOR.$MINOR line."

if [ "$PATCH" -eq 0 ]; then
  ensure_milestone "$next_minor_version" "Issues that we want to release in v$next_minor_version."
  ensure_milestone "$next_minor_line" "Issues that we want to resolve in $MAJOR.$((MINOR + 1)) line."
fi

echo "Milestone summary:"
echo "- Released milestone: $released_version ($released_action)"
echo "- New milestones created: $created_count"
```

### Step 7: Output Summary

> **IMPORTANT**: All TUI command formats listed below must be output in full. Do not show only the format for the current AI agent.

```
Release v{version} prepared.

Release info:
- Version: {version}
- Release commit: {commit-hash}
- Tag: v{version}

Files updated: {count}

Next steps (manual):

1. Push tag:
   git push origin v{version}

2. Push branch:
   git push origin {current-branch}

3. (Optional) Generate release notes:
   - Claude Code / OpenCode: /create-release-note {version}
   - Gemini CLI: /{{project}}:create-release-note {version}
   - Codex CLI: $create-release-note {version}
```

### Rollback Instructions

If something went wrong:
```bash
# Delete tag
git tag -d v{version}

# Reset commit
git reset --soft HEAD~1

# Restore files
git checkout -- .
```

## Notes

1. **Clean workspace required**: Must have no uncommitted changes
2. **No auto-push**: All operations are local only; user pushes manually
3. **No build verification**: Run the test skill before releasing to verify
4. **Version replacement scope**: Search determines which files to update; exclude AI tool directories
5. **Adapt to your project**: The version update steps above are generic; customize for your project's versioning scheme
6. **Milestone coordination**: Releases should create the next planning milestones automatically; initialize the taxonomy first with `init-milestones` when needed

## Error Handling

- Invalid version format: Prompt correct format and exit
- Dirty workspace: Prompt to commit or stash
- Git operation failure: Display error and provide rollback instructions
