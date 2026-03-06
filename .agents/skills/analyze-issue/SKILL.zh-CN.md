---
name: analyze-issue
description: >
  分析 GitHub Issue 并创建任务文件和需求分析文档。
  当用户要求分析某个 issue 时触发。参数为 issue 编号。
---

# 分析 Issue

## 执行步骤

1. 获取 Issue 信息:
   ```bash
   gh issue view <issue-number> --json number,title,body,labels
   ```
2. 生成任务ID，创建任务目录，基于模板创建 task.md。
3. 执行需求分析（仅分析，不编写业务代码）。
4. 输出分析文档到 analysis.md。
5. 更新任务状态。
6. 提示下一步使用 `plan-task` 技能。

**注意**: 禁止编写或修改任何业务代码，只做分析。
