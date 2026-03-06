---
description: 根据自然语言描述创建任务并执行需求分析
---

根据用户描述创建任务。参数：$ARGUMENTS

**关键**：只产出 task.md 和 analysis.md，禁止编写业务代码。

1. 解析描述：提取标题（英文，不超过 50 字符）、类型、工作流。
2. 获取时间戳：`date +%Y%m%d-%H%M%S`
3. 创建任务目录：`.ai-workspace/active/TASK-{timestamp}/`
4. 基于 `.agents/templates/task.md` 创建 task.md。
5. 执行需求分析（仅分析，不编写业务代码）。
6. 输出分析到 analysis.md。
7. 更新任务状态。
8. 提示下一步：`/plan-task {task-id}`。

**停止**：不要继续后续步骤。
