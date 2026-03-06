---
name: block-task
description: >
  标记任务为阻塞状态并记录阻塞原因，移动到 blocked 目录。
  当用户报告任务被阻塞时触发。参数为 task-id 和可选的阻塞原因。
---

# 标记任务阻塞

## 执行步骤

1. 验证任务存在。
2. 分析并记录阻塞原因。
3. 更新 task.md: status -> blocked。
4. 移动到 `.ai-workspace/blocked/`。

解除阻塞: `mv .ai-workspace/blocked/<task-id> .ai-workspace/active/`
