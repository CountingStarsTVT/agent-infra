---
name: complete-task
description: >
  标记任务完成并归档到 completed 目录。
  当用户要求完成任务、归档任务时触发。参数为 task-id。
---

# 完成任务

## 前置条件
所有工作流步骤已完成、代码已审查通过、代码已提交、所有测试通过。

## 执行步骤

1. 验证任务存在和完整性。
2. 更新 task.md: status -> completed, 添加 completed_at。
3. 归档: `mv .ai-workspace/active/<task-id> .ai-workspace/completed/`
4. 验证归档成功。
