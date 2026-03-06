---
description: 更新项目 AI 协作配置
agent: general
subtask: false
---

将现有 AI 协作配置更新到最新版本。

1. **检查当前配置**

!ls -la .agents/
!ls -la .ai-workspace/

如果 `.agents/` 不存在，回复：
"未找到现有配置。请使用 `/init-project` 初始化。"
然后 STOP。

2. **备份当前配置**

!cp -r .agents/ .agents.backup.$(date +%Y%m%d%H%M%S)

3. **更新模板**

对比并更新 `.agents/templates/task.md` 的最新模板字段。保留用户自定义的字段。

4. **更新工作流**

对比并更新 `.agents/workflows/` 中的工作流定义。保留自定义工作流，同时更新标准工作流。

5. **验证目录结构**

确保所有必需目录存在：

!mkdir -p .ai-workspace/active
!mkdir -p .ai-workspace/blocked
!mkdir -p .ai-workspace/completed

6. **报告变更**

列出所有已更新、新增或未改动的文件。提及备份位置。

**下一步：** 审查更新后的配置文件。
