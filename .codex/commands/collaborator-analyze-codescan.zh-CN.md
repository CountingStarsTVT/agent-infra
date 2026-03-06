---
description: 分析 Code Scanning 告警并创建安全分析文档
argument-hint: <alert-number>
---

分析 Code Scanning (CodeQL) 告警 #$1，评估安全风险并创建修复任务。

执行以下步骤:

1. 获取告警信息:
   ```bash
   gh api repos/{owner}/{repo}/code-scanning/alerts/$1
   ```

2. 创建任务目录和 task.md:
   - codescan_alert_number: $1
   - current_step: security-analysis
   - assigned_to: codex

3. 定位和分析源码:
   - 根据 location 定位源码文件和行号
   - 读取上下文（前后 20 行）
   - 分析触发规则的原因
   - 检查其他位置是否有相同问题

4. 评估安全风险: 可利用性、代码路径可达性、修复紧急程度。

5. 输出分析文档到 analysis.md。

6. 更新任务状态。

7. 告知用户:
   - 设计修复方案: `/prompts:collaborator-plan-task <task-id>`
   - 如果是误报: `/prompts:collaborator-close-codescan $1`

**注意**: Critical/High 立即处理，Medium 计划处理，Low 可延后。
