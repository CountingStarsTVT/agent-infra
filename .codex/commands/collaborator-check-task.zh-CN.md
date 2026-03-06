---
description: 查看任务的当前状态和进度
argument-hint: <task-id>
---

查看任务 $1 的当前状态、进度和上下文文件。

执行以下步骤:

1. 查找任务文件:
   - .ai-workspace/active/$1/task.md（优先）
   - .ai-workspace/blocked/$1/task.md
   - .ai-workspace/completed/$1/task.md

2. 读取任务元数据: id, type, workflow, status, current_step, assigned_to, created_at, updated_at。

3. 检查上下文文件: analysis.md, plan.md, implementation.md, review.md。

4. 输出状态报告（基本信息、当前状态、工作流进度、上下文文件、下一步建议）。

**下一步建议规则**:
- 需求分析完成 -> `/prompts:collaborator-plan-task $1`
- 技术方案完成 -> 等待人工审查，通过后 `/prompts:collaborator-implement-task $1`
- 实现完成 -> `/prompts:collaborator-review-task $1`
- 审查通过 -> `/prompts:collaborator-commit`
- 审查需修改 -> `/prompts:collaborator-refine-task $1`
- 任务阻塞 -> 显示阻塞原因和解除条件
