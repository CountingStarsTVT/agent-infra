---
name: refine-task
description: >
  处理代码审查反馈并修复审查中发现的问题。
  当用户要求修复审查问题时触发。参数为 task-id。
---

# 修复审查问题

## 执行步骤

1. 验证 task.md 和 review.md 存在。
2. 读取审查报告，按优先级（Blocker -> Major -> Minor）逐项修复。
3. 执行 `test` 技能进行测试验证。
4. 更新 implementation.md，追加修复记录。
5. 更新任务状态。
6. 提示重新审查或直接提交。

**注意**: 不要添加额外变更，不要自动 git commit。
