---
description: 关闭 Code Scanning 告警（需提供合理理由）
argument-hint: <alert-number>
---

关闭 Code Scanning (CodeQL) 告警 #$1。关闭前会要求用户确认并提供合理的理由。

执行以下步骤:

1. 获取告警信息:
   ```bash
   gh api "repos/{owner}/{repo}/code-scanning/alerts/$1"
   ```
   如果已是 dismissed 或 fixed，提示用户并退出。

2. 展示告警详情: 严重程度、规则ID、规则说明、工具、位置。

3. 询问关闭理由:
   1. 误报（False Positive）
   2. 不会修复（Won't Fix）
   3. 测试代码（Used in Tests）
   4. 取消

4. 要求详细说明（最少 20 个字符）。

5. 确认后执行:
   ```bash
   gh api --method PATCH "repos/{owner}/{repo}/code-scanning/alerts/$1" \
     -f state=dismissed -f dismissed_reason="<reason>" -f dismissed_comment="<comment>"
   ```

6. 告知用户: 告警已关闭。分析其他告警: `/prompts:collaborator-analyze-codescan <alert-number>`

**注意**: 谨慎关闭高危告警，优先考虑修复。建议先用 `/prompts:collaborator-analyze-codescan $1` 分析。
