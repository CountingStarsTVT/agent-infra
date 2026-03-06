---
name: analyze-codescan
description: >
  分析 Code Scanning（CodeQL）告警并创建安全分析文档。
  当用户要求分析 Code Scanning 告警时触发。参数为告警编号。
---

# 分析 Code Scanning 告警

## 执行步骤

### 1. 获取告警信息

```bash
gh api repos/{owner}/{repo}/code-scanning/alerts/<alert-number>
```

提取关键信息：
- `number`: 告警编号
- `state`: 状态（open/dismissed/fixed）
- `rule`: 规则信息（id、severity、description、security_severity_level）
- `tool`: 扫描工具信息（name、version）
- `most_recent_instance`: 最近实例（location、message、state）
- `html_url`: GitHub 告警链接

### 2. 创建任务目录和文件

检查是否已存在该告警的任务（搜索 `.ai-workspace/active/`）。

**任务目录结构**：
```
.ai-workspace/active/TASK-{yyyyMMdd-HHmmss}/
├── task.md          <- 使用 .agents/templates/task.md 模板创建
└── analysis.md      <- 本技能将创建此文件
```

任务元数据需包含：
```yaml
id: TASK-{yyyyMMdd-HHmmss}
codescan_alert_number: <alert-number>
severity: <critical/high/medium/low>
rule_id: <rule-id>
tool: <tool-name>
```

### 3. 定位和分析源码

- 根据 `most_recent_instance.location` 定位源码文件和行号
- 读取告警所在的源码上下文（前后 20 行）
- 理解 CodeQL 规则的含义和检测逻辑
- 分析代码为什么触发了该规则
- 检查是否有其他位置也存在相同问题
- 评估是否为误报

### 4. 评估安全风险

- 评估漏洞的实际影响（是否可被利用）
- 分析代码路径是否可达（外部输入能否到达漏洞点）
- 评估对系统安全性的影响程度
- 识别潜在的攻击向量
- 确定修复的紧急程度
- 评估修复的复杂度和风险

### 5. 输出分析文档

创建 `.ai-workspace/active/{task-id}/analysis.md`，包含：
- 告警基本信息（编号、严重程度、规则ID、扫描工具、状态）
- 告警详情（源码位置、代码上下文、规则说明）
- 影响范围评估（直接影响的代码、相同模式的其他位置）
- 安全风险评估（可利用性、攻击向量、影响程度、紧急程度）
- 修复建议（推荐修复方式、修复复杂度）
- 技术依赖和约束
- 参考链接

### 6. 更新任务状态

更新 task.md: current_step -> security-analysis, 标记 analysis.md 为已完成。

### 7. 告知用户

输出分析摘要，提示下一步：
- 审查后使用 `plan-task` 技能设计修复方案
- 如果是误报，使用 `close-codescan` 技能关闭告警

## 注意事项

- 执行前检查告警是否存在
- Critical/High 优先级立即处理，Medium 计划处理，Low 可延后
- 专注于信息收集和风险评估，不制定具体修复方案
- 分析完成后建议人工审查
- 检查代码路径可达性，评估输入可控性

## 相关技能

- `close-codescan` - 关闭 Code Scanning 告警
- `analyze-dependabot` - 分析 Dependabot 依赖漏洞告警
- `plan-task` - 设计修复方案
- `check-task` - 查看任务状态
