---
description: 标记任务完成并归档到 completed 目录
agent: general
subtask: false
---

标记任务为已完成，更新元数据，并从 active 目录归档到 completed 目录。

从 `$ARGUMENTS` 中解析任务 ID。如果为空，回复：
"请提供任务 ID。示例：/complete-task TASK-20260101-120000"
然后 STOP。

1. **验证任务存在**

检查 `.ai-workspace/active/{task-id}/task.md`。如果不在 active 中，检查 blocked 和 completed 目录。

如果未找到，回复："任务 {task-id} 不存在。"然后 STOP。
如果已完成，回复："任务 {task-id} 已经完成。"然后 STOP。

2. **验证完成前置条件**

确认所有条件满足：
- 所有工作流步骤已完成
- 代码审查通过（review.md 显示批准）
- 代码已提交到 Git
- 所有测试通过

如果任一条件未满足，报告缺失内容并 STOP。

3. **更新任务状态**

更新 task.md YAML 前置元数据：
- status: completed
- current_step: finalize
- updated_at: {当前时间戳}
- completed_at: {当前时间戳}

标记所有工作流步骤为已完成。添加完成总结章节。

4. **归档任务**

!mkdir -p .ai-workspace/completed
!mv .ai-workspace/active/{task-id} .ai-workspace/completed/

验证移动：
!test -d .ai-workspace/completed/{task-id} && echo "归档成功" || echo "错误：归档失败"

5. **同步到 Issue（可选）**

如果任务有关联的 issue_number，建议使用 `/sync-issue` 更新 Issue。

6. **向用户报告**

报告任务 ID、类型、完成时间、归档位置和交付成果摘要。
