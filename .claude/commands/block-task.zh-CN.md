---
description: 标记任务阻塞并记录原因
---

阻塞任务 $ARGUMENTS。

1. 验证任务在 `.ai-workspace/active/` 中存在。
2. 分析并记录阻塞原因。
3. 更新 task.md: status -> blocked，添加 blocked_at, blocked_reason。
4. 移动：`mv .ai-workspace/active/{task-id} .ai-workspace/blocked/`
5. 如有关联 Issue 则同步状态。

解除阻塞：`mv .ai-workspace/blocked/{task-id} .ai-workspace/active/`
