---
name: close-dependabot
description: >
  关闭 Dependabot 依赖漏洞告警（需提供合理理由）。
  当用户要求关闭 Dependabot 告警时触发。参数为告警编号。
---

# 关闭 Dependabot 告警

## 执行步骤

### 1. 获取安全告警信息

```bash
gh api repos/{owner}/{repo}/dependabot/alerts/<alert-number>
```

验证告警状态：已关闭则提示退出，open 则继续。

### 2. 展示告警详情

向用户展示告警关键信息（严重程度、漏洞摘要、受影响包、版本范围、GHSA/CVE ID）。

### 3. 询问关闭理由

让用户选择关闭理由：
1. **误报 (False Positive)** - 漏洞代码路径未被使用
2. **无法利用 (Not Exploitable)** - 当前场景下无法被利用
3. **已有缓解措施 (Mitigated)** - 通过其他方式缓解了风险
4. **无修复版本且风险可接受 (No Fix Available)** - 无修复版本，风险可接受
5. **测试或开发依赖 (Dev Dependency Only)** - 仅开发环境使用
6. **取消** - 退出

### 4. 要求详细说明

要求用户提供详细文字说明（最少 20 字符），清晰说明为什么可以安全关闭。

### 5. 最终确认

显示即将提交的信息，要求用户确认（y/N）。

### 6. 执行关闭操作

```bash
gh api --method PATCH \
  repos/{owner}/{repo}/dependabot/alerts/<alert-number> \
  -f state=dismissed \
  -f dismissed_reason="{API参数}" \
  -f dismissed_comment="{用户的详细说明}"
```

**API dismissed_reason 映射**：
- 误报 -> `not_used` 或 `inaccurate`
- 无法利用 -> `tolerable_risk`
- 已有缓解措施 -> `tolerable_risk`
- 无修复版本 -> `tolerable_risk`
- 开发依赖 -> `not_used`

### 7. 记录到任务（如果存在）

搜索相关任务，添加关闭记录并归档。

### 8. 告知用户

输出关闭摘要和查看链接。

## 注意事项

- 谨慎关闭 Critical/High 告警，需有充分技术分析支持
- 建议先使用 `analyze-dependabot` 技能进行分析
- 关闭理由必须真实准确，会保存在 GitHub 中
- 被关闭的告警应定期复查
- 优先考虑修复，关闭应是最后选择

## 相关技能

- `analyze-dependabot` - 分析安全告警
- `plan-task` - 设计修复方案
- `upgrade-dependency` - 升级依赖
