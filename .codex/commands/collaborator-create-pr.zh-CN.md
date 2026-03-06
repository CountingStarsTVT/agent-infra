---
description: 创建 Pull Request
argument-hint: <target-branch>
---

创建 Pull Request 到指定分支（默认: 自动推断父分支）。

执行以下步骤:

1. 确定目标分支:
   用户指定的目标分支: $1
   如果为空，自动推断:
   ```bash
   git branch --show-current
   git log --oneline --decorate --first-parent -20
   ```

2. 读取 PR 模板:
   ```bash
   cat .github/PULL_REQUEST_TEMPLATE.md
   ```

3. 查看最近的 merged PR 格式参考:
   ```bash
   gh pr list --limit 3 --state merged --json number,title,body
   ```

4. 分析当前分支的完整变更:
   ```bash
   git status
   git log <target-branch>..HEAD --oneline
   git diff <target-branch>...HEAD --stat
   ```

5. 检查远程分支状态，未推送则先推送。

6. 根据模板创建 PR:
   ```bash
   gh pr create --base <target-branch> --title "<标题>" --body "$(cat <<'EOF'
   <完整PR描述>
   EOF
   )"
   ```

**下一步**:
- 同步进度到 PR: `/prompts:collaborator-sync-pr <task-id>`
- 完成任务: `/prompts:collaborator-complete-task <task-id>`

**注意**: PR 标题必须遵循 Conventional Commits 格式。
