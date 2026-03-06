---
description: 审查任务实现并输出代码审查报告
agent: general
subtask: false
---

审查任务的代码实现，检查质量、合规性和测试覆盖，然后输出审查报告。

从 `$ARGUMENTS` 中解析任务 ID。如果为空，回复：
"请提供任务 ID。示例：/review-task TASK-20260101-120000"
然后 STOP。

1. **验证前置条件**

检查以下文件是否存在：
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/active/{task-id}/implementation.md`

如果任一文件缺失，回复："实现报告不存在。请先运行 `/implement-task {task-id}`。"然后 STOP。

2. **读取实现报告**

读取 implementation.md，了解：修改的文件、关键功能、测试结果、标记需要关注的事项。

3. **执行代码审查**

审查实际代码变更：
- 代码质量和编码规范
- Bug 和潜在问题
- 测试覆盖率和测试质量
- 错误处理和边界情况
- 性能和安全问题
- 文档和注释
- 与技术方案的一致性

4. **输出审查报告**

创建 `.ai-workspace/active/{task-id}/review.md`，包含章节：

- 审查概要（审查者、时间、范围、总体评价）
- 阻塞问题（必须修复）
- 重要建议（应当修复）
- 次要建议（建议修复）
- 亮点和优点
- 合规检查
- 测试审查
- 安全审查
- 性能审查
- 方案一致性检查
- 最终结论：通过 / 需要修改 / 需要重大修改

5. **更新任务状态**

更新 task.md：current_step: code-review、assigned_to: opencode、updated_at: {当前时间戳}。

6. **向用户报告**

按严重程度报告问题数量和总体评价。

**下一步（基于评价结果）：**
- 通过：使用 `/commit` 提交变更。
- 需要修改：使用 `/refine-task {task-id}` 处理反馈。
- 需要重大修改：使用 `/implement-task {task-id}` 重新实施。
