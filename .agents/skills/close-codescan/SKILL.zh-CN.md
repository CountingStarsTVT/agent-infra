---
name: close-codescan
description: >
  关闭 Code Scanning（CodeQL）告警（需提供合理理由）。
  当用户要求关闭 Code Scanning 告警时触发。参数为告警编号。
---

# 关闭 Code Scanning 告警

## 执行步骤

### 1. 获取告警信息

```bash
gh api repos/{owner}/{repo}/code-scanning/alerts/<alert-number>
```

验证告警状态：已关闭则提示退出，open 则继续。

### 2. 展示告警详情

向用户展示告警关键信息（严重程度、规则ID、规则描述、扫描工具、源码位置、告警消息）。

### 3. 询问关闭理由

让用户选择关闭理由：
1. **误报 (False Positive)** - CodeQL 规则误判，代码不存在此安全问题
2. **不会修复 (Won't Fix)** - 已知问题但基于架构或业务原因不予修复
3. **测试代码 (Used in Tests)** - 仅在测试代码中出现，不影响生产环境
4. **取消** - 退出

### 4. 要求详细说明

要求用户提供详细文字说明（最少 20 字符），清晰说明为什么可以安全关闭。

### 5. 最终确认

显示即将提交的信息，要求用户确认（y/N）。

### 6. 执行关闭操作

```bash
gh api --method PATCH \
  repos/{owner}/{repo}/code-scanning/alerts/<alert-number> \
  -f state=dismissed \
  -f dismissed_reason="{API参数}" \
  -f dismissed_comment="{用户的详细说明}"
```

**API dismissed_reason 映射**：
- 误报 -> `false positive`
- 不会修复 -> `won't fix`
- 测试代码 -> `used in tests`

### 7. 记录到任务（如果存在）

搜索相关任务（含 `codescan_alert_number` 的任务），添加关闭记录并归档。

### 8. 告知用户

输出关闭摘要和查看链接。

## 注意事项

- 谨慎关闭 Critical/High 告警，需有充分技术分析支持
- 建议先使用 `analyze-codescan` 技能进行分析
- 关闭理由必须真实准确，会保存在 GitHub 中
- 被关闭的告警应定期复查
- 优先考虑修复源代码，关闭应是最后选择

## 相关技能

- `analyze-codescan` - 分析 Code Scanning 告警
- `analyze-dependabot` - 分析 Dependabot 依赖漏洞告警
- `plan-task` - 设计修复方案
