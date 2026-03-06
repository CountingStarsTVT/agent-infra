---
name: analyze-dependabot
description: >
  分析 Dependabot 依赖漏洞告警并创建安全分析文档。
  当用户要求分析 Dependabot 告警时触发。参数为告警编号。
---

# 分析 Dependabot 告警

## 执行步骤

### 1. 获取安全告警信息

```bash
gh api repos/{owner}/{repo}/dependabot/alerts/<alert-number>
```

提取关键信息：
- `number`: 告警编号
- `state`: 状态（open/dismissed/fixed）
- `security_advisory`: 安全公告详情（ghsa_id、cve_id、severity、summary、description、vulnerabilities）
- `dependency`: 受影响的依赖（package.name、package.ecosystem、manifest_path）
- `security_vulnerability`: 首个修复版本、受影响版本范围

### 2. 创建任务目录和文件

检查是否已存在该安全告警的任务（搜索 `.ai-workspace/active/`）。

**任务目录结构**：
```
.ai-workspace/active/TASK-{yyyyMMdd-HHmmss}/
├── task.md          <- 使用 .agents/templates/task.md 模板创建
└── analysis.md      <- 本技能将创建此文件
```

任务元数据需包含：
```yaml
id: TASK-{yyyyMMdd-HHmmss}
security_alert_number: <alert-number>
severity: <critical/high/medium/low>
cve_id: <CVE-ID>
ghsa_id: <GHSA-ID>
```

### 3. 分析受影响范围

- 识别受影响的依赖包和版本
- 搜索项目中使用该依赖的所有位置
- 检查依赖文件（pom.xml、requirements.txt、package.json 等）
- 分析是否直接使用了漏洞代码路径
- 识别依赖关系（直接依赖 vs 传递依赖）
- 定位受影响的代码模块和文件

### 4. 评估安全风险

- 评估漏洞的实际影响（是否可被利用）
- 分析漏洞触发条件和场景
- 评估对系统安全性的影响程度
- 识别潜在的安全威胁
- 确定修复的紧急程度
- 查找是否有已知的攻击案例

### 5. 输出分析文档

创建 `.ai-workspace/active/{task-id}/analysis.md`，包含：
- 告警基本信息（编号、严重程度、GHSA/CVE ID、状态）
- 漏洞详情（受影响的依赖、版本、依赖使用情况）
- 影响范围评估（直接影响的代码、间接影响的功能）
- 安全风险评估（可利用性、触发条件、影响程度、紧急程度）
- 技术依赖和约束
- 参考链接

### 6. 更新任务状态

更新 task.md: current_step -> security-analysis, 标记 analysis.md 为已完成。

### 7. 告知用户

输出分析摘要，提示下一步：
- 审查后使用 `plan-task` 技能设计修复方案
- 如果是误报，使用 `close-dependabot` 技能关闭告警

## 注意事项

- 执行前检查告警是否存在
- Critical/High 优先级立即处理，Medium 计划处理，Low 可延后
- 专注于信息收集和风险评估，不制定具体修复方案
- 分析完成后建议人工审查
- 区分直接依赖和传递依赖

## 相关技能

- `close-dependabot` - 关闭 Dependabot 告警
- `plan-task` - 设计修复方案
- `check-task` - 查看任务状态
- `upgrade-dependency` - 升级依赖
