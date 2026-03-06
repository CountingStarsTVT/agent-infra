---
description: 更新项目 AI 协作配置到最新的 ai-collaborator 模板
usage: /prompts:collaborator-update-project
---

# 更新项目

将当前项目的 AI 协作基础设施和项目治理更新到最新的 ai-collaborator 模板。智能合并模板变更，同时保留项目特定的自定义内容。

## 步骤 1：读取项目配置

读取项目根目录的 `collaborator.json`。
提取：source、project、org、branchPrefix、language、modules、files（managed/merged/ejected 列表）。

## 步骤 2：定位模板源

如果 source 为 "self"（ai-collaborator 自身更新），使用当前仓库。
否则，从 `~/.ai-collaborator/` 读取。
如果不存在，报告错误："模板源未找到。请先克隆：
`git clone https://github.com/fitlab-ai/ai-collaborator ~/.ai-collaborator`"

## 步骤 3：确定更新范围

仅处理 `collaborator.json.modules` 中列出的模块所属文件。

## 步骤 4：处理受管文件

对 `files.managed` 中的每个路径（按活跃模块过滤）：
1. 从模板源读取对应文件
2. 根据 `language` 设置选择语言版本
3. 适配项目引用（项目名、组织、分支前缀）
4. 写入项目（覆盖现有文件）
5. 模板中的新文件 -> 创建
6. 模板中已删除的文件 -> 标记提醒用户，不自动删除

## 步骤 5：处理合并文件（AI 智能合并）

对 `files.merged` 中的每个路径：
1. 读取最新模板和当前本地文件
2. 分析标识模板标准部分和用户自定义内容
3. 生成合并结果，保留用户自定义内容

**合并原则**：不确定时保留用户内容，不静默删除用户添加的内容。

## 步骤 6：跳过已脱管文件

不触碰 `files.ejected` 中列出的文件。

## 步骤 7：更新 collaborator.json

## 步骤 8：输出报告

**停止**：不要对项目进行其他更改。
