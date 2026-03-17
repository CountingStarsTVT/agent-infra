---
name: init-milestones
description: >
  一次性初始化仓库的标准 GitHub Milestones 体系。
  创建 General Backlog、基于当前版本的初始里程碑，并可选补齐历史版本里程碑。
---

# 初始化 GitHub Milestones

一次性初始化仓库的标准 GitHub Milestones 体系。

## 执行流程

### 1. 验证前置条件

执行：

```bash
command -v gh
gh auth status
gh repo view --json nameWithOwner
```

如果任一命令失败，提示用户先安装或登录 `gh`，然后停止。

为后续步骤创建临时工作目录：

```bash
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT
```

### 2. 解析参数

检查参数中是否包含 `--history` 标志。

```bash
history_mode="false"

case " $ARGUMENTS " in
  *" --history "*) history_mode="true" ;;
esac

echo "History mode: $history_mode"
```

### 3. 检测当前版本基线

优先使用最新 Git tag；如果没有 tag，则回退到 `package.json`；如果仍无法确定，则使用默认值 `0.1.0`。

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

### 4. 获取现有里程碑列表

```bash
repo="$(gh repo view --json nameWithOwner --jq '.nameWithOwner')"

gh api "repos/$repo/milestones?state=all" --paginate \
  --jq '.[] | [.title, .state] | @tsv' > "$tmpdir/existing.tsv"

cut -f1 "$tmpdir/existing.tsv" > "$tmpdir/existing-titles.txt"
cat "$tmpdir/existing.tsv"
```

### 5. 准备标准里程碑定义

按固定描述创建以下里程碑：
- `General Backlog`：`All unsorted backlogged tasks may be completed in a future version.`（state=`open`）
- `{major}.{minor}.x`：`Issues that we want to resolve in {major}.{minor} line.`（state=`open`）
- `{major}.{minor}.{patch+1}`：`Issues that we want to release in v{major}.{minor}.{patch+1}.`（state=`open`）
- `--history` 模式下，每个历史版本 `{major}.{minor}.{patch}` 额外生成：
  - `{major}.{minor}.x` 线里程碑（state=`open`）
  - `{major}.{minor}.{patch}` 版本里程碑（state=`closed`）

```bash
cat <<EOF > "$tmpdir/desired.tsv"
General Backlog	All unsorted backlogged tasks may be completed in a future version.	open
$line_milestone	Issues that we want to resolve in $major.$minor line.	open
$next_version	Issues that we want to release in v$next_version.	open
EOF

if [ "$history_mode" = "true" ]; then
  git tag --list 'v*' --sort=v:refname > "$tmpdir/history-tags.txt"

  if [ ! -s "$tmpdir/history-tags.txt" ]; then
    echo "No history tags found matching v*; only standard milestones will be created."
  else
    while IFS= read -r tag; do
      [ -n "$tag" ] || continue

      ver="${tag#v}"
      h_major="${ver%%.*}"
      h_rest="${ver#*.}"
      h_minor="${h_rest%%.*}"
      h_patch="${h_rest#*.}"
      h_patch="${h_patch%%[^0-9]*}"

      if ! printf '%s %s %s\n' "$h_major" "$h_minor" "$h_patch" | grep -Eq '^[0-9]+ [0-9]+ [0-9]+$'; then
        echo "Skip non-semver tag: $tag"
        continue
      fi

      printf '%s\t%s\t%s\n' \
        "$h_major.$h_minor.x" \
        "Issues that we want to resolve in $h_major.$h_minor line." \
        "open" >> "$tmpdir/desired.tsv"

      printf '%s\t%s\t%s\n' \
        "$h_major.$h_minor.$h_patch" \
        "Issues that we want to release in v$h_major.$h_minor.$h_patch." \
        "closed" >> "$tmpdir/desired.tsv"
    done < "$tmpdir/history-tags.txt"
  fi
fi
```

### 6. 创建缺失的里程碑

逐个检查标题是否已存在；已存在则跳过，不重复创建。

```bash
: > "$tmpdir/created.txt"
: > "$tmpdir/skipped.txt"

while IFS="$(printf '\t')" read -r title description state; do
  [ -n "$title" ] || continue
  state="${state:-open}"

  if grep -Fqx "$title" "$tmpdir/existing-titles.txt"; then
    printf '%s\n' "$title" >> "$tmpdir/skipped.txt"
    echo "Skip existing milestone: $title"
    continue
  fi

  gh api "repos/$repo/milestones" \
    -f title="$title" \
    -f description="$description" \
    -f state="$state" >/dev/null

  printf '%s\n' "$title" >> "$tmpdir/created.txt"
  printf '%s\n' "$title" >> "$tmpdir/existing-titles.txt"
  echo "Created milestone: $title ($state)"
done < "$tmpdir/desired.tsv"
```

### 7. 汇总结果

向用户报告执行结果：

```bash
created_count="$(wc -l < "$tmpdir/created.txt" | tr -d ' ')"
skipped_count="$(wc -l < "$tmpdir/skipped.txt" | tr -d ' ')"

echo "GitHub Milestones initialized."
echo
echo "Summary:"
echo "- Version baseline: $current_version"
echo "- History mode: $history_mode"
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
echo "- Without --history, version milestones are created only for the next patch release."

if [ "$history_mode" = "true" ]; then
  echo "- Historical X.Y.Z tags create X.Y.x milestones as open and X.Y.Z milestones as closed."
  echo "- Repositories with many tags may hit the GitHub API rate limit."
fi
```

## 错误处理

- 未找到 `gh`：提示 "GitHub CLI (`gh`) is not installed"
- 认证失败：提示 "GitHub CLI is not authenticated"
- 仓库访问失败：提示 "Unable to access the current repository with gh"
- 版本解析失败：提示 "Unable to determine current version baseline"
- `--history` 模式下未找到任何 `v*` git tags：提示 "No history tags found matching v*; only standard milestones will be created"
- 权限不足：提示 "No permission to manage milestones in this repository"
- API 限流：提示 "GitHub API rate limit reached, please retry later"
