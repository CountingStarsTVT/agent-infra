---
name: init-milestones
description: >
  Initialize the repository's standard GitHub Milestones taxonomy in one pass.
  Create General Backlog and the initial milestones derived from the current version baseline.
---

# Initialize GitHub Milestones

Initialize the repository's standard GitHub Milestones taxonomy.

## Execution Flow

### 1. Verify prerequisites

Run:

```bash
command -v gh
gh auth status
gh repo view --json nameWithOwner
```

If any command fails, tell the user to install or authenticate `gh` first and stop.

Create a temporary workspace for the remaining steps:

```bash
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT
```

### 2. Detect the current version baseline

Prefer the latest Git tag. If no tag exists, fall back to `package.json`. If the version is still unknown, use the default `0.1.0`.

```bash
current_version=""
latest_tag="$(git tag --list 'v*' --sort=-v:refname | head -1)"

if [ -n "$latest_tag" ]; then
  current_version="${latest_tag#v}"
elif [ -f package.json ]; then
  current_version="$(node -p "const version = require('./package.json').version || ''; version.replace(/^v/, '').replace(/-.*/, '')")"
fi

if [ -z "$current_version" ]; then
  current_version="0.1.0"
fi

major="${current_version%%.*}"
rest="${current_version#*.}"
minor="${rest%%.*}"
patch="${rest#*.}"
patch="${patch%%[^0-9]*}"

printf '%s %s %s\n' "$major" "$minor" "$patch" | grep -Eq '^[0-9]+ [0-9]+ [0-9]+$'

line_milestone="$major.$minor.x"
next_version="$major.$minor.$((patch + 1))"

echo "Detected version baseline: $current_version"
echo "Line milestone: $line_milestone"
echo "Next version milestone: $next_version"
```

### 3. List existing milestones

```bash
repo="$(gh repo view --json nameWithOwner --jq '.nameWithOwner')"

gh api "repos/$repo/milestones?state=all" --paginate \
  --jq '.[] | [.title, .state] | @tsv' > "$tmpdir/existing.tsv"

cut -f1 "$tmpdir/existing.tsv" > "$tmpdir/existing-titles.txt"
cat "$tmpdir/existing.tsv"
```

### 4. Prepare the standard milestone definitions

Create the following milestones with fixed descriptions:
- `General Backlog`: `All unsorted backlogged tasks may be completed in a future version.`
- `{major}.{minor}.x`: `Issues that we want to resolve in {major}.{minor} line.`
- `{major}.{minor}.{patch+1}`: `Issues that we want to release in v{major}.{minor}.{patch+1}.`

```bash
cat <<EOF > "$tmpdir/desired.tsv"
General Backlog	All unsorted backlogged tasks may be completed in a future version.
$line_milestone	Issues that we want to resolve in $major.$minor line.
$next_version	Issues that we want to release in v$next_version.
EOF
```

### 5. Create missing milestones

Check each title before creating it. If the title already exists, skip it instead of creating a duplicate.

```bash
: > "$tmpdir/created.txt"
: > "$tmpdir/skipped.txt"

while IFS="$(printf '\t')" read -r title description; do
  [ -n "$title" ] || continue

  if grep -Fqx "$title" "$tmpdir/existing-titles.txt"; then
    printf '%s\n' "$title" >> "$tmpdir/skipped.txt"
    echo "Skip existing milestone: $title"
    continue
  fi

  gh api "repos/$repo/milestones" \
    -f title="$title" \
    -f description="$description" \
    -f state="open" >/dev/null

  printf '%s\n' "$title" >> "$tmpdir/created.txt"
  echo "Created milestone: $title"
done < "$tmpdir/desired.tsv"
```

### 6. Summarize the result

Report the result to the user:

```bash
created_count="$(wc -l < "$tmpdir/created.txt" | tr -d ' ')"
skipped_count="$(wc -l < "$tmpdir/skipped.txt" | tr -d ' ')"

echo "GitHub Milestones initialized."
echo
echo "Summary:"
echo "- Version baseline: $current_version"
echo "- Created milestones: $created_count"
echo "- Skipped existing milestones: $skipped_count"

if [ -s "$tmpdir/created.txt" ]; then
  echo "- Newly created:"
  sed 's/^/  - /' "$tmpdir/created.txt"
fi

if [ -s "$tmpdir/skipped.txt" ]; then
  echo "- Already present:"
  sed 's/^/  - /' "$tmpdir/skipped.txt"
fi

echo
echo "Notes:"
echo "- Milestone titles are treated as the idempotency key."
echo "- General Backlog is the fallback milestone for unsorted work."
echo "- Version milestones are created only for the next patch release."
```

## Error Handling

- `gh` not found: prompt "GitHub CLI (`gh`) is not installed"
- Authentication failed: prompt "GitHub CLI is not authenticated"
- Repository access failed: prompt "Unable to access the current repository with gh"
- Version detection failed: prompt "Unable to determine current version baseline"
- Permission error: prompt "No permission to manage milestones in this repository"
- API rate limit: prompt "GitHub API rate limit reached, please retry later"
