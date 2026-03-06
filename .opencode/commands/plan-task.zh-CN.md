---
description: 为任务设计技术方案
agent: general
subtask: false
---

为指定任务设计技术方案并输出详细实施计划。

从 `$ARGUMENTS` 中解析任务 ID。如果为空，回复：
"请提供任务 ID。示例：/plan-task TASK-20260101-120000"
然后 STOP。

1. **查找任务文件**

按顺序搜索：
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/blocked/{task-id}/task.md`
- `.ai-workspace/completed/{task-id}/task.md`

如果未找到，回复："任务 {task-id} 不存在。"然后 STOP。

2. **读取需求分析**

读取 `.ai-workspace/{status}/{task-id}/analysis.md`。
如果不存在，回复："需求分析文档不存在。请先运行 `/analyze-issue` 或 `/create-task`。"然后 STOP。

3. **理解问题本质**

- 阅读 analysis.md，理解根本原因和影响范围
- 识别技术约束
- 识别特殊要求（安全、性能、向后兼容性）

4. **设计解决方案**

- 提出多个可行方案
- 对比各方案的优劣
- 选择最佳方案并说明理由
- 制定详细实施步骤
- 列出需要创建/修改的文件清单
- 设计验证策略（测试、验证）
- 评估影响（性能、安全、兼容性）
- 制定风险控制和回滚方案

5. **输出方案文档**

创建 `.ai-workspace/{status}/{task-id}/plan.md`，包含章节：决策依据、技术方案、实施步骤、文件清单、验证策略、影响评估、风险控制。

6. **更新任务状态**

更新 task.md：current_step: technical-design、assigned_to: opencode、updated_at: {当前时间戳}。

7. **向用户报告**

报告方案摘要、输出文件路径，并提示这是人工审查检查点。

**下一步：** 审查方案后，使用 `/implement-task {task-id}` 开始实施。
