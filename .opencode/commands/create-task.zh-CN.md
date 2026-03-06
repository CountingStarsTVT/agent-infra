---
description: 从自然语言描述创建任务并执行需求分析
agent: general
subtask: false
---

根据用户的自然语言描述创建任务并执行需求分析。此命令仅产出 task.md 和 analysis.md 文件——不实现任何功能。

从 `$ARGUMENTS` 中解析任务描述。如果为空，回复：
"请提供任务描述。示例：/create-task 添加优雅停机功能"
然后 STOP。

1. **解析用户描述**

从描述中提取：
- 任务标题：简洁的英文标题（50 字符以内）
- 任务类型：feature | bugfix | refactor | docs | chore
- 工作流：feature-development | bug-fix | refactoring
- 详细描述：对原始输入的整理版本

如果描述不清晰，先向用户确认关键信息。

2. **创建任务目录和文件**

!date -u +"%Y%m%d-%H%M%S"

创建目录：`.ai-workspace/active/TASK-{yyyyMMdd-HHmmss}/`

使用 `.agents/templates/task.md` 模板创建 `task.md`，元数据包括：
- id、type、workflow、status: active
- created_at、updated_at、created_by: human
- current_step: requirement-analysis、assigned_to: opencode

3. **执行需求分析**

分析代码库（只读）以理解：
- 相关代码文件及其结构
- 影响范围（直接和间接）
- 技术风险和依赖
- 复杂度和工作量评估

4. **输出分析文档**

创建 `.ai-workspace/active/{task-id}/analysis.md`，包含章节：
- 需求来源和原始描述
- 需求理解
- 相关文件列表
- 影响范围评估
- 技术风险
- 依赖关系
- 复杂度和工作量评估

5. **更新任务状态**

更新 task.md：current_step: requirement-analysis，标记分析为已完成。

6. **向用户报告**

报告任务 ID、标题、类型、工作流、输出文件路径，并建议：

**下一步：** 审查分析文档后，使用 `/plan-task {task-id}` 设计技术方案。

在此 STOP。不要继续执行 plan 或 implement。
