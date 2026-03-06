---
description: 审查任务实现并输出代码审查报告
---

审查任务 $ARGUMENTS 的实现。

1. 验证 `task.md` 和 `implementation.md` 存在。
2. 读取实现报告并查看 `git diff`。
3. 执行全面代码审查：代码质量、Bug、测试覆盖、错误处理、性能安全、与方案一致性。
4. 输出审查报告到 `review.md`，按严重程度分类（Blocker / Major / Minor）。
5. 更新任务状态。
6. 建议下一步：无 Blocker 则 `/commit`，有问题则 `/refine-task {task-id}`。
