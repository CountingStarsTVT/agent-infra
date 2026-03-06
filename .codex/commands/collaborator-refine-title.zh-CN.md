---
description: 深度分析 Issue 或 PR 内容并重构标题为 Conventional Commits 格式
argument-hint: <id>
---

针对 GitHub Issue 或 PR #$1，深度分析内容后重构标题为 Conventional Commits 格式。

执行以下步骤:

1. 识别对象与获取信息:
   先尝试 Issue:
   ```bash
   gh issue view $1 --json number,title,body,labels,state
   ```
   如果失败，尝试 PR:
   ```bash
   gh pr view $1 --json number,title,body,labels,state,files
   ```

2. 智能分析:
   - 确定 Type: 阅读 body、检查 labels、分析 files
   - 确定 Scope: 分析涉及的模块
   - 生成 Subject: 从 body 中提炼核心意图（忽略原标题），英文祈使语气，不超过 50 字符

3. 展示建议并询问确认:
   ```
   分析对象: Issue/PR #$1
   当前标题: <原标题>
   分析依据: <推断类型和范围的依据>
   建议标题: <type>(<scope>): <subject>
   ```
   询问: "是否确认修改？(y/n)"

4. 确认后执行:
   Issue: `gh issue edit $1 --title "<new-title>"`
   PR: `gh pr edit $1 --title "<new-title>"`

5. 告知用户: 显示原标题和新标题。

**注意**: 必须先分析内容，不要直接重新格式化原标题。确保用户确认后再修改。
