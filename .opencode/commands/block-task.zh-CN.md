---
description: 标记任务为阻塞并记录阻塞原因
agent: general
subtask: false
---

当任务无法继续时标记为阻塞状态，记录详细原因，并移动到 blocked 目录。

从 `$ARGUMENTS` 中解析任务 ID。如果为空，回复：
"请提供任务 ID。示例：/block-task TASK-20260101-120000"
然后 STOP。

1. **验证任务存在**

检查 `.ai-workspace/active/{task-id}/task.md`。
如果未找到，回复："任务 {task-id} 不在 active 目录中。"然后 STOP。

2. **分析阻塞原因**

记录：
- 遇到了什么具体问题
- 问题出现在哪个步骤
- 根本原因分析
- 已尝试的解决方案及失败原因
- 需要什么帮助或资源
- 预计解决时间

3. **更新任务状态**

更新 task.md YAML 前置元数据：
- status: blocked
- updated_at: {当前时间戳}
- blocked_at: {当前时间戳}
- blocked_by: opencode
- blocked_reason: {简短描述}

在 task.md 中添加"阻塞信息"章节，包含：概要、问题描述、根本原因、已尝试的方案、需要的帮助、解除阻塞条件、备用方案。

4. **移动到 blocked 目录**

!mkdir -p .ai-workspace/blocked
!mv .ai-workspace/active/{task-id} .ai-workspace/blocked/

验证移动：
!test -d .ai-workspace/blocked/{task-id} && echo "已移至 blocked" || echo "错误：移动失败"

5. **同步到 Issue（可选）**

如果任务有关联的 Issue，建议使用 `/sync-issue` 更新。

6. **向用户报告**

报告任务 ID、阻塞步骤、原因和需要的帮助。

**解除阻塞：** 解决问题后，将任务移回：
```
mv .ai-workspace/blocked/{task-id} .ai-workspace/active/
```
然后使用 `/check-task {task-id}` 继续。
