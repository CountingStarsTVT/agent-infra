---
description: 关闭 Code Scanning 告警并记录理由
agent: general
subtask: false
---

在用户确认后关闭指定的 Code Scanning（CodeQL）告警并记录理由。

从 `$ARGUMENTS` 中解析告警编号。如果为空，回复：
"请提供告警编号。示例：/close-codescan 5"
然后 STOP。

1. **获取告警信息**

!gh api repos/{owner}/{repo}/code-scanning/alerts/$ARGUMENTS

如果告警不存在，回复："Code Scanning 告警 #$ARGUMENTS 不存在。"然后 STOP。
如果已关闭或已修复，回复："告警 #$ARGUMENTS 已经是 {state} 状态。"然后 STOP。

2. **展示告警详情**

向用户展示：严重程度、规则 ID、规则描述、工具名称、文件位置、告警消息。

3. **询问关闭理由**

请用户选择理由：
1. 误报 - CodeQL 误判，代码实际上不存在此漏洞
2. 不修复 - 已知问题但基于架构/业务原因不修复
3. 测试代码 - 仅出现在测试代码中，无生产影响
4. 取消 - 不关闭

如果用户选择取消，回复："已取消。"然后 STOP。

4. **要求详细说明**

请用户提供详细的关闭说明（至少 20 个字符）用于记录。

5. **关闭前确认**

展示关闭摘要并请求最终确认（y/N）。
如果未确认，回复："已取消。"然后 STOP。

6. **执行关闭**

将用户选择映射到 GitHub API dismissed_reason：
- 误报：`false positive`
- 不修复：`won't fix`
- 测试代码：`used in tests`

!gh api --method PATCH repos/{owner}/{repo}/code-scanning/alerts/$ARGUMENTS -f state=dismissed -f dismissed_reason="{reason}" -f dismissed_comment="{explanation}"

7. **更新任务（如存在）**

搜索相关任务，如果找到则更新其状态。

8. **向用户报告**

确认关闭，包含告警详情、理由和告警页面链接。
