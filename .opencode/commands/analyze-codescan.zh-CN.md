---
description: 分析 Code Scanning 告警并创建安全分析文档
agent: general
subtask: false
---

分析指定的 Code Scanning（CodeQL）告警，评估安全风险，并创建带安全分析文档的任务。

从 `$ARGUMENTS` 中解析告警编号。如果为空，回复：
"请提供告警编号。示例：/analyze-codescan 5"
然后 STOP。

1. **获取告警信息**

!gh api repos/{owner}/{repo}/code-scanning/alerts/$ARGUMENTS

如果告警不存在，回复："Code Scanning 告警 #$ARGUMENTS 不存在。"然后 STOP。

提取：number、state、rule（id、severity、description、security_severity_level）、tool（name、version）、most_recent_instance（location、message）、html_url。

2. **创建任务目录和文件**

!date -u +"%Y%m%d-%H%M%S"

创建目录：`.ai-workspace/active/TASK-{yyyyMMdd-HHmmss}/`
创建 task.md，包含 codescan_alert_number、severity、rule_id、tool 字段。

3. **定位和分析源码**

- 读取告警位置的源文件及周围上下文
- 理解 CodeQL 规则及其检测内容
- 分析代码为什么触发了该规则
- 搜索项目中是否有类似模式
- 评估是否为误报

4. **评估安全风险**

- 评估实际可利用性
- 分析外部输入是否能到达该代码路径
- 评估对系统安全的影响
- 识别潜在攻击向量
- 确定修复紧急程度和复杂度

5. **输出分析文档**

创建 `.ai-workspace/active/{task-id}/analysis.md`，包含章节：
- 告警基本信息（编号、严重程度、规则 ID、工具、状态）
- 告警详情（源码位置、代码上下文、规则说明）
- 影响范围评估
- 安全风险评估（可利用性、攻击向量、影响、紧急程度）
- 修复建议
- 技术约束
- 参考链接

6. **更新任务状态**

更新 task.md：current_step: security-analysis、assigned_to: opencode、updated_at: {当前时间戳}。

7. **向用户报告**

报告告警严重程度、规则、位置、任务 ID、风险等级。

**下一步：**
- 设计修复方案：`/plan-task {task-id}`
- 如果是误报：`/close-codescan {alert-number}`
