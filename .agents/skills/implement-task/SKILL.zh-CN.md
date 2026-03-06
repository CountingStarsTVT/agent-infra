---
name: implement-task
description: >
  根据技术方案实施任务，编写代码和测试，输出实现报告。
  当用户要求实施任务、开始编码时触发。参数为 task-id。
---

# 实施任务

## 执行步骤

1. 验证 task.md 和 plan.md 存在。
2. 读取技术方案。
3. 按照 plan.md 执行代码实现，编写单元测试。
4. 执行 `test` 技能进行测试验证。
5. 输出实现报告到 implementation.md。
6. 更新任务状态。
7. 提示下一步使用 `review-task` 技能。

**注意**: 严格遵循 plan.md，不要自动 git commit。
