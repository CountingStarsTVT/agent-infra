---
description: 分析 Dependabot 依赖漏洞告警并创建安全分析文档
argument-hint: <alert-number>
---

分析 Dependabot 安全告警 #$1，评估安全风险并创建修复任务。

执行以下步骤:

1. 获取安全告警信息:
   ```bash
   gh api repos/{owner}/{repo}/dependabot/alerts/$1
   ```

2. 创建任务目录和 task.md:
   - security_alert_number: $1
   - current_step: security-analysis
   - assigned_to: codex

3. 分析受影响范围: 搜索项目中使用该依赖的位置，分析漏洞代码路径是否被使用。

4. 评估安全风险: 可利用性、触发条件、修复紧急程度。

5. 输出分析文档到 analysis.md。

6. 更新任务状态。

7. 告知用户:
   - 设计修复方案: `/prompts:collaborator-plan-task <task-id>`
   - 如果是误报: `/prompts:collaborator-close-dependabot $1`

**注意**: Critical/High 立即处理，Medium 计划处理，Low 可延后。
