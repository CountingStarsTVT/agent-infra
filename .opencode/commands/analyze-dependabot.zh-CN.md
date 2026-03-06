---
description: 分析 Dependabot 安全告警并创建安全分析文档
agent: general
subtask: false
---

分析指定的 Dependabot 安全告警，评估风险，并创建带安全分析文档的任务。

从 `$ARGUMENTS` 中解析告警编号。如果为空，回复：
"请提供告警编号。示例：/analyze-dependabot 23"
然后 STOP。

1. **获取告警信息**

!gh api repos/{owner}/{repo}/dependabot/alerts/$ARGUMENTS

如果告警不存在，回复："Dependabot 告警 #$ARGUMENTS 不存在。"然后 STOP。

提取：number、state、security_advisory（ghsa_id、cve_id、severity、summary、description）、dependency（包名、生态系统、manifest_path）、vulnerable_version_range、first_patched_version。

2. **创建任务目录和文件**

!date -u +"%Y%m%d-%H%M%S"

创建目录：`.ai-workspace/active/TASK-{yyyyMMdd-HHmmss}/`
创建 task.md，包含 security_alert_number、severity、cve_id、ghsa_id 字段。

3. **分析影响范围**

- 识别受影响的依赖包和版本
- 搜索项目中对该依赖的所有使用
- 检查依赖文件，区分直接依赖和传递依赖
- 分析是否实际使用了漏洞代码路径
- 定位受影响的代码模块

4. **评估安全风险**

- 评估实际可利用性
- 分析触发条件和场景
- 评估对系统安全的影响
- 识别潜在威胁
- 确定修复紧急程度

5. **输出分析文档**

创建 `.ai-workspace/active/{task-id}/analysis.md`，包含章节：
- 告警基本信息（编号、严重程度、GHSA/CVE ID、状态）
- 漏洞详情（包名、版本、修复版本）
- 项目中的依赖使用情况
- 影响范围评估
- 安全风险评估（可利用性、触发条件、影响、紧急程度）
- 技术约束
- 参考链接

6. **更新任务状态**

更新 task.md：current_step: security-analysis、assigned_to: opencode、updated_at: {当前时间戳}。

7. **向用户报告**

报告告警严重程度、受影响包、任务 ID、风险等级。

**下一步：**
- 设计修复方案：`/plan-task {task-id}`
- 如果是误报：`/close-dependabot {alert-number}`
