---
name: create-task
description: >
  根据用户的自然语言描述创建任务并执行需求分析。
  当用户描述一个新功能、Bug 或改进需求时触发。参数为任务描述。
---

# 创建任务

**行为边界**: 只产出 task.md 和 analysis.md，禁止编写业务代码。

## 执行步骤

1. 获取当前时间，解析用户描述（标题、类型、工作流）。
2. 创建任务目录，基于 `.agents/templates/task.md` 模板创建 task.md。
3. 执行需求分析（仅分析，不编写业务代码）。
4. 输出分析文档到 analysis.md。
5. 更新任务状态，标记 requirement-analysis 为完成。
6. 提示下一步使用 `plan-task` 技能。

**停止**: 完成后立即停止，不要继续执行后续步骤。
