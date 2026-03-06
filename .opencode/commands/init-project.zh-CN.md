---
description: 初始化项目 AI 协作配置
agent: general
subtask: false
---

初始化项目的 AI 协作配置文件（.agents/、.ai-workspace/ 等）。

1. **检查现有配置**

!ls -la .agents/ 2>/dev/null
!ls -la .ai-workspace/ 2>/dev/null

如果 `.agents/` 已存在，询问用户是覆盖还是跳过。

2. **创建目录结构**

!mkdir -p .agents/templates
!mkdir -p .agents/workflows
!mkdir -p .agents/conventions
!mkdir -p .ai-workspace/active
!mkdir -p .ai-workspace/blocked
!mkdir -p .ai-workspace/completed

3. **创建任务模板**

创建 `.agents/templates/task.md`，包含 YAML 前置元数据字段：id、type、workflow、status、created_at、updated_at、created_by、current_step、assigned_to。

4. **创建工作流定义**

创建 `.agents/workflows/feature-development.yaml`，包含步骤：requirement-analysis、technical-design、implementation、code-review、refinement、finalize。

5. **更新 .gitignore**

确保 `.ai-workspace/` 运行时目录被忽略：

```
.ai-workspace/active/
.ai-workspace/blocked/
.ai-workspace/completed/
```

6. **报告结果**

列出所有已创建的文件和目录。建议用户审查配置并根据需要进行定制。

**下一步：** 使用 `/create-task` 或 `/analyze-issue` 开始任务。
