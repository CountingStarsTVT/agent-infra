---
description: 分析 GitHub Issue 并创建需求分析文档
argument-hint: <issue-number>
---

分析 GitHub Issue #$1 并创建任务文件。

执行以下步骤:

1. 获取 Issue 信息:
   ```bash
   gh issue view $1 --json number,title,body,labels
   ```

2. 生成任务ID:
   ```bash
   date +%Y%m%d-%H%M%S
   ```

3. 创建任务目录和 task.md（基于 `.agents/templates/task.md` 模板）:
   - issue_number=$1, current_step: requirement-analysis, assigned_to: codex

4. 执行需求分析（仅分析，不编写业务代码）:
   - 理解 Issue 描述
   - 搜索相关代码文件（只读不改）
   - 分析影响范围和技术风险

5. 输出分析文档到 analysis.md

6. 更新任务状态

7. 告知用户:
   - 输出任务ID、标题、工作流
   - 提示下一步: `/prompts:collaborator-plan-task <task-id>`

**注意**: 禁止编写、修改任何业务代码，只做分析。

**停止**: 完成后立即停止，不要继续执行后续步骤。
