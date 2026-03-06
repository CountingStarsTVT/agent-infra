---
description: 处理代码审查反馈并修复问题
argument-hint: <task-id>
---

处理任务 $1 的代码审查反馈，修复审查中发现的问题。

执行以下步骤:

1. 验证前置条件:
   检查必需文件:
   - .ai-workspace/active/$1/task.md
   - .ai-workspace/active/$1/review.md

2. 读取审查报告:
   整理问题: Blocker（必须修复）、Major（建议修复）、Minor（可选修复）。

3. 按优先级逐项修复（Blocker -> Major -> Minor）:
   - 理解根因并实施修复
   - 每修复一个问题就运行测试验证

4. 运行测试验证:
   执行项目测试流程。参考 `test` 技能了解具体命令。

5. 在 implementation.md 中追加"修复记录"章节

6. 更新任务状态:
   - current_step: refinement
   - assigned_to: codex
   - updated_at: 当前时间

7. 告知用户:
   - 重新审查: `/prompts:collaborator-review-task $1`
   - 或直接提交: `/prompts:collaborator-commit`

**注意**: 严格按审查报告修复，不要添加额外变更，不要自动 git commit。
