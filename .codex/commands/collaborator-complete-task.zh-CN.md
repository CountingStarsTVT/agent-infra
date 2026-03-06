---
description: 标记任务完成并归档到 completed 目录
argument-hint: <task-id>
---

标记任务 $1 为已完成状态，更新任务元数据，并归档到 completed 目录。

**前置条件**:
- 所有工作流步骤已完成
- 代码已审查通过
- 代码已提交到 Git
- 所有测试通过
**如果条件未全部满足，请勿执行此命令。**

执行以下步骤:

1. 验证任务存在:
   ```bash
   test -f .ai-workspace/active/$1/task.md && echo "任务存在" || echo "ERROR: 任务不存在"
   ```

2. 读取并验证任务状态，检查文件完整性。

3. 获取当前时间:
   ```bash
   date '+%Y-%m-%d %H:%M:%S'
   ```

4. 更新 task.md: status: completed, current_step: finalize, completed_at: 当前时间。

5. 添加完成总结。

6. 归档任务:
   ```bash
   mkdir -p .ai-workspace/completed && mv .ai-workspace/active/$1 .ai-workspace/completed/
   ```

7. 验证移动成功。

8. 告知用户:
   - 任务已完成并归档
   - 查看其他任务: `/prompts:collaborator-check-task <task-id>`

**注意**: 只有真正完成所有工作后才归档。
