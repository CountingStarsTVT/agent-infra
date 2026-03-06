---
name: review-task
description: >
  审查任务实现代码，输出代码审查报告。
  当用户要求审查代码、review 任务时触发。参数为 task-id。
---

# 代码审查

## 执行步骤

1. 验证 task.md 和 implementation.md 存在。
2. 读取上下文，查看 git diff。
3. 执行代码审查（功能、质量、测试、安全、性能、边界情况）。
4. 输出审查报告到 review.md（分类：Blocker / Major / Minor）。
5. 更新任务状态。
6. 提示下一步: `refine-task` 技能或 `commit` 技能。
