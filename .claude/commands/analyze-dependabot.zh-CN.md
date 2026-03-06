---
description: 分析 Dependabot 依赖漏洞告警
---

分析 Dependabot 告警 #$ARGUMENTS。

1. 获取告警：`gh api repos/{owner}/{repo}/dependabot/alerts/$ARGUMENTS`。
2. 创建任务目录。
3. 分析受影响范围。
4. 评估安全风险。
5. 输出分析到 `analysis.md`。
6. 建议：`/plan-task` 修复或 `/close-dependabot` 关闭。
