---
description: 查看任务状态和进度
agent: general
subtask: false
---

显示指定任务的当前状态、进度和上下文文件。

从 `$ARGUMENTS` 中解析任务 ID。如果为空，回复：
"请提供任务 ID。示例：/check-task TASK-20260101-120000"
然后 STOP。

1. **查找任务文件**

按顺序搜索：
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/blocked/{task-id}/task.md`
- `.ai-workspace/completed/{task-id}/task.md`

如果未找到，回复："任务 {task-id} 不存在。"然后 STOP。

2. **检查上下文文件**

检查以下文件是否存在：
- `analysis.md` - 需求分析
- `plan.md` - 技术方案
- `implementation.md` - 实现报告
- `review.md` - 审查报告
- `refinement-report.md` - 修复报告

3. **分析当前状态**

根据任务文件和上下文文件，确定：
- 当前工作流步骤
- 已完成步骤 vs 待执行步骤
- 当前负责人
- 是否等待人工审查

4. **输出状态报告**

显示格式化的状态报告，包括：
- 基本信息：任务 ID、标题、类型、Issue 编号、时间戳
- 当前状态：工作流、步骤、负责人、状态
- 工作流进度及步骤完成指示
- 上下文文件及其存在状态和大小
- 文件路径
- 基于当前状态的下一步建议

根据当前工作流步骤提供具体的下一步命令建议。
