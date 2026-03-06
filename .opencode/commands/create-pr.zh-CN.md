---
description: 创建 Pull Request
agent: general
subtask: false
---

为当前分支创建 Pull Request。

1. **确定目标分支**

如果提供了 `$ARGUMENTS`，使用它作为目标分支。否则推断：

!git branch --show-current
!git log --oneline --decorate --first-parent -20

- 在主分支/版本分支上：目标为当前分支
- 在特性分支上：从 log 装饰中找到最近的父主分支
- 无法确定时：询问用户

2. **读取 PR 模板**

检查 `.github/PULL_REQUEST_TEMPLATE.md` 是否存在，如果存在则读取。

3. **参考最近合并的 PR 风格**

!gh pr list --limit 3 --state merged --json number,title,body

4. **分析当前分支变更**

!git status --short
!git log {target-branch}..HEAD --oneline
!git diff {target-branch}...HEAD --stat

5. **推送分支（如需要）**

!git rev-parse --abbrev-ref --symbolic-full-name @{u} 2>/dev/null || echo "No upstream"

如果没有设置上游：
!git push -u origin $(git branch --show-current)

6. **创建 Pull Request**

使用模板格式创建 PR，参考最近 PR 的风格。在 body 末尾添加生成标记行。

!gh pr create --base {target-branch} --title "{title}" --body "{body}"

PR body 末尾必须有生成归属行。

7. **向用户报告**

显示 PR URL。

**下一步：** 使用 `/sync-pr {task-id}` 同步进度，或完成后使用 `/complete-task {task-id}`。
