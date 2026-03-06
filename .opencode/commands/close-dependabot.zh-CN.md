---
description: 关闭 Dependabot 安全告警并记录理由
agent: general
subtask: false
---

在用户确认后关闭指定的 Dependabot 安全告警并记录理由。

从 `$ARGUMENTS` 中解析告警编号。如果为空，回复：
"请提供告警编号。示例：/close-dependabot 23"
然后 STOP。

1. **获取告警信息**

!gh api repos/{owner}/{repo}/dependabot/alerts/$ARGUMENTS

如果告警不存在，回复："Dependabot 告警 #$ARGUMENTS 不存在。"然后 STOP。
如果已关闭或已修复，回复："告警 #$ARGUMENTS 已经是 {state} 状态。"然后 STOP。

2. **展示告警详情**

向用户展示：严重程度、摘要、受影响包、当前版本、受影响范围、修复版本、GHSA/CVE ID。

3. **询问关闭理由**

请用户选择理由：
1. 误报 - 漏洞代码路径未被使用
2. 无法利用 - 在当前上下文中无法被利用
3. 已有缓解措施 - 通过其他方式已解决风险
4. 无修复版本 - 可接受的风险且无修复方案
5. 仅开发依赖 - 生产环境不使用
6. 取消 - 不关闭

如果用户选择取消，回复："已取消。"然后 STOP。

4. **要求详细说明**

请用户提供详细的关闭说明（至少 20 个字符）用于记录。

5. **关闭前确认**

展示关闭摘要并请求最终确认（y/N）。
如果未确认，回复："已取消。"然后 STOP。

6. **执行关闭**

将用户选择映射到 GitHub API dismissed_reason：
- 误报：`not_used` 或 `inaccurate`
- 无法利用：`tolerable_risk`
- 已有缓解措施：`tolerable_risk`
- 无修复版本：`tolerable_risk`
- 仅开发依赖：`not_used`

!gh api --method PATCH repos/{owner}/{repo}/dependabot/alerts/$ARGUMENTS -f state=dismissed -f dismissed_reason="{reason}" -f dismissed_comment="{explanation}"

7. **更新任务（如存在）**

搜索相关任务，如果找到则更新其状态。

8. **向用户报告**

确认关闭，包含告警详情、理由和告警页面链接。
