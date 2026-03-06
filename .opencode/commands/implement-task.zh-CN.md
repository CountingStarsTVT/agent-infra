---
description: 根据技术方案实施任务
agent: general
subtask: false
---

根据技术方案实施指定任务，编写代码和测试，输出实现报告。

从 `$ARGUMENTS` 中解析任务 ID。如果为空，回复：
"请提供任务 ID。示例：/implement-task TASK-20260101-120000"
然后 STOP。

1. **验证前置条件**

检查以下文件是否存在：
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/active/{task-id}/plan.md`

如果任一文件缺失，回复："前置条件未满足。请先运行 `/plan-task {task-id}`。"然后 STOP。

2. **读取技术方案**

读取 plan.md，理解：技术方案、实施步骤、需要创建/修改的文件、测试策略。

3. **执行代码实现**

严格遵循方案：
- 逐步实现代码变更
- 为新代码编写单元测试
- 运行测试验证功能
- 更新文档和注释
- 遵循项目编码规范

不要偏离方案或添加计划外的功能。

4. **运行测试**

<!-- TODO: 替换为你项目的测试命令 -->
!npm test

确保所有测试通过后再继续。

5. **输出实现报告**

创建 `.ai-workspace/active/{task-id}/implementation.md`，包含章节：
- 修改文件列表（新增和变更）
- 关键代码说明
- 测试结果
- 与方案的差异（如有）
- 需要审查者关注的事项
- 已知问题

6. **更新任务状态**

更新 task.md：current_step: implementation、assigned_to: opencode、updated_at: {当前时间戳}。

7. **向用户报告**

报告文件数量、测试结果和输出文件路径。

不要自动提交。等待代码审查。

**下一步：** 使用 `/review-task {task-id}` 进行代码审查。
