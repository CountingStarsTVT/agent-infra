---
description: 分析 GitHub Issue 并创建任务
---

分析 GitHub Issue #$ARGUMENTS。

1. 获取 Issue 信息：`gh issue view $ARGUMENTS --json number,title,body,labels`。
2. 生成任务 ID。
3. 基于模板创建任务目录。
4. 执行需求分析（仅分析，不编写业务代码）。
5. 输出分析到 `analysis.md`。
6. 更新任务状态。
7. 提示下一步：`/plan-task {task-id}`。

**注意**: 禁止编写或修改业务代码，只做分析。
