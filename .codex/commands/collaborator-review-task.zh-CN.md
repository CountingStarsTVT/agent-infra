---
description: 审查任务实现并输出代码审查报告
argument-hint: <task-id>
---

审查任务 $1 的实现代码，输出代码审查报告。

执行以下步骤:

1. 验证前置条件:
   检查必需文件:
   - .ai-workspace/active/$1/task.md
   - .ai-workspace/active/$1/implementation.md
   如果不存在，提示用户先完成前置步骤。

2. 读取上下文:
   - 读取 task.md 了解任务要求
   - 读取 plan.md 了解技术方案
   - 读取 implementation.md 了解实现细节
   - 查看 `git diff` 获取代码变更

3. 执行代码审查:
   对照 plan.md 检查: 功能正确性、代码质量、测试覆盖、安全性、性能、边界情况。

4. 输出审查报告:
   创建 .ai-workspace/active/$1/review.md，包含:
   - 审查概要（审查者、时间、范围、总体评价）
   - 审查发现（分级: Blocker / Major / Minor）
   - 规范检查和安全/性能审查结果
   - 总结与建议（批准 / 修改后批准 / 需要重大修改）

5. 更新任务状态:
   - current_step: code-review
   - assigned_to: codex
   - updated_at: 当前时间
   - 标记 code-review 为完成

6. 告知用户:
   - 如果需要修改: `/prompts:collaborator-refine-task $1`
   - 如果批准: `/prompts:collaborator-commit`

**注意**: 对照 plan.md 审查，给出具体的修改建议。
