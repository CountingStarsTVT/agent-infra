---
description: 根据技术方案实施任务
---

根据技术方案实施任务 $ARGUMENTS。

1. 验证 `task.md` 和 `plan.md` 存在。
2. 读取技术方案。
3. 按照 `plan.md` 执行代码实现，编写单元测试。
4. 执行 `test` 技能进行测试验证。
5. 输出实现报告到 `implementation.md`。
6. 更新任务状态。
7. 提示下一步：`/review-task {task-id}`。

**注意**: 严格遵循 plan.md，不要自动 git commit。
