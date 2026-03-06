---
description: 处理代码审查反馈并修复问题
agent: general
subtask: false
---

处理代码审查反馈，修复发现的问题，准备重新审查。

从 `$ARGUMENTS` 中解析任务 ID。如果为空，回复：
"请提供任务 ID。示例：/refine-task TASK-20260101-120000"
然后 STOP。

1. **验证前置条件**

检查以下文件是否存在：
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/active/{task-id}/review.md`（或 review-supplement.md）
- `.ai-workspace/active/{task-id}/implementation.md`

如果任一文件缺失，回复："审查报告不存在。请先运行 `/review-task {task-id}`。"然后 STOP。

2. **读取审查报告**

从审查报告中提取所有问题，按严重程度分类：
- 阻塞问题（必须修复）
- 重要建议（应当修复）
- 次要建议（建议修复）

3. **规划修复**

创建优先级修复清单：
1. 首先修复所有阻塞问题
2. 然后修复重要建议
3. 最后考虑次要建议

4. **执行代码修复**

对于每个问题：
- 读取相关文件并理解上下文
- 按照审查建议进行修复
- 确保修复不引入新问题

5. **运行测试**

<!-- TODO: 替换为你项目的测试命令 -->
!npm test

确保修复后所有测试通过。

6. **更新任务状态**

更新 task.md：current_step: refinement、assigned_to: opencode、updated_at: {当前时间戳}。

7. **创建修复报告**

创建 `.ai-workspace/active/{task-id}/refinement-report.md`，记录：
- 已修复的阻塞问题
- 已修复的重要建议
- 已采纳的次要建议
- 未修复的项及理由
- 修复后的测试结果

8. **向用户报告**

按严重程度报告修复数量并建议下一步。

**下一步：**
- 重新审查：使用 `/review-task {task-id}` 再次审查。
- 如果修复较小且有信心：直接使用 `/commit`。
