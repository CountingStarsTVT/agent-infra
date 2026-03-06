---
description: 处理代码审查反馈并修复问题
---

修复任务 $ARGUMENTS 的审查问题。

1. 验证 `task.md` 和 `review.md` 存在。
2. 读取审查报告，按优先级分类（Blocker -> Major -> Minor）。
3. 逐项修复。
4. 执行 `test` 技能进行测试验证。
5. 更新 `implementation.md`，追加修复记录。
6. 更新任务状态。
7. 建议：重新审查 `/review-task` 或直接 `/commit`。

**注意**: 不要添加额外变更，不要自动 git commit。
