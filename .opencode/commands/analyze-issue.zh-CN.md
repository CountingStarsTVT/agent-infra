---
description: 分析 GitHub Issue 并创建需求分析文档
agent: general
subtask: false
---

分析指定的 GitHub Issue，创建任务并输出需求分析文档。

从 `$ARGUMENTS` 中解析 Issue 编号。如果为空，回复：
"请提供 Issue 编号。示例：/analyze-issue 207"
然后 STOP。

1. **获取 Issue 信息**

!gh issue view $ARGUMENTS --json number,title,body,labels

如果 Issue 不存在，回复："Issue #$ARGUMENTS 不存在。"然后 STOP。

2. **检查现有任务**

在 `.ai-workspace/active/` 中搜索是否已有关联此 Issue 的任务。如果找到，询问是否重新分析或使用现有分析。

3. **创建任务目录和文件**

!date -u +"%Y%m%d-%H%M%S"

创建目录：`.ai-workspace/active/TASK-{yyyyMMdd-HHmmss}/`
从 `.agents/templates/task.md` 创建 task.md，设置 issue_number 字段。

4. **执行需求分析**

- 阅读并理解 Issue 描述
- 搜索代码库中的相关文件
- 分析代码结构和影响范围
- 识别技术风险和依赖
- 评估复杂度和工作量

5. **输出分析文档**

创建 `.ai-workspace/active/{task-id}/analysis.md`，包含章节：
- 需求理解
- 相关文件列表
- 影响范围评估（直接和间接）
- 技术风险
- 依赖关系
- 复杂度和工作量评估

6. **更新任务状态**

更新 task.md：current_step: requirement-analysis、assigned_to: opencode、updated_at: {当前时间戳}。标记分析为已完成。

7. **向用户报告**

报告 Issue 编号、任务 ID、标题、输出文件路径。

**下一步：** 审查分析文档后，使用 `/plan-task {task-id}` 设计技术方案。
