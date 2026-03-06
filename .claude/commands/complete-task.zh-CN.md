---
description: 标记任务完成并归档
---

完成并归档任务 $ARGUMENTS。

1. 验证任务在 `.ai-workspace/active/` 中存在。
2. 检查前置条件：工作流步骤完成、代码已审查、已提交、测试通过。
3. 更新 task.md: status -> completed，添加 completed_at。
4. 归档：`mv .ai-workspace/active/{task-id} .ai-workspace/completed/`
5. 验证归档成功。
