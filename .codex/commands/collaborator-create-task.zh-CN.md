---
description: 根据自然语言描述创建任务并生成需求分析文档
argument-hint: <description>
---

根据用户的自然语言描述创建任务并执行需求分析。

**行为边界**: 只产出 task.md 和 analysis.md，禁止编写业务代码。

用户描述: $ARGUMENTS

执行以下步骤:

1. 获取当前时间:
   ```bash
   date '+%Y-%m-%d %H:%M:%S'
   date +%Y%m%d-%H%M%S
   ```

2. 解析用户描述:
   - 任务标题: 精简的英文标题（50字符以内）
   - 任务类型: feature|bugfix|refactor|docs|chore（根据描述推断）
   - 工作流: feature/docs/chore -> feature-development, bugfix -> bug-fix, refactor -> refactoring

   如果描述不够清晰，先向用户确认。

3. 创建任务目录:
   ```bash
   mkdir -p .ai-workspace/active/TASK-<timestamp>/
   ```
   基于 `.agents/templates/task.md` 模板创建 task.md:
   - 填写元数据: id, type, workflow, status, created_at, updated_at
   - created_by: human
   - current_step: requirement-analysis
   - assigned_to: codex

4. 执行需求分析（仅分析，不编写业务代码）:
   - 理解需求描述
   - 搜索相关代码文件（只读不改）
   - 分析代码结构和影响范围
   - 识别技术风险和依赖

5. 输出分析文档到 analysis.md

6. 更新任务状态:
   - current_step: requirement-analysis
   - updated_at: 当前时间
   - 在工作流进度中标记 requirement-analysis 为完成

7. 告知用户:
   - 输出任务ID、标题、类型、工作流
   - 提示下一步: `/prompts:collaborator-plan-task <task-id>`

**停止**: 完成后立即停止，不要继续执行后续步骤。
