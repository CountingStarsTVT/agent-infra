---
name: check-task
description: >
  查看任务的当前状态、进度和上下文文件。
  当用户要求查看任务状态时触发。参数为 task-id。
---

# 查看任务状态

## 执行步骤

1. 查找任务文件（搜索 active/blocked/completed 目录）。
2. 读取 task.md 中的元数据。
3. 检查上下文文件: analysis.md, plan.md, implementation.md, review.md。
4. 输出状态报告和下一步建议。
