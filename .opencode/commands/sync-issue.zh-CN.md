---
description: 将任务处理进度同步到 GitHub Issue 评论
agent: general
subtask: false
---

将任务进度摘要同步到关联的 GitHub Issue 评论中。

从 `$ARGUMENTS` 中解析任务 ID。如果为空，回复：
"请提供任务 ID。示例：/sync-issue TASK-20260101-120000"
然后 STOP。

1. **查找任务文件**

按顺序搜索：
- `.ai-workspace/active/{task-id}/task.md`
- `.ai-workspace/blocked/{task-id}/task.md`
- `.ai-workspace/completed/{task-id}/task.md`

如果未找到，回复："任务 {task-id} 不存在。"然后 STOP。

2. **读取任务信息**

从 task.md 提取：issue_number、标题、current_step、status、时间戳。

如果缺少 issue_number，回复："任务文件中未找到 Issue 编号。请在 task.md 中更新 issue_number。"然后 STOP。

3. **读取上下文文件**

读取可用的上下文文件：analysis.md、plan.md、implementation.md、review.md。

4. **生成进度摘要**

创建面向项目管理者和干系人的进度摘要，包括：
- 已完成步骤及时间戳和要点
- 当前进展详情
- 下一步计划
- 相关文件引用

保持简洁、逻辑清晰，突出关键决策。

5. **发布到 Issue**

!gh issue comment {issue-number} --body "{进度摘要}"

6. **更新任务元数据**

在 task.md 中记录同步时间戳。

7. **向用户报告**

显示同步确认和 Issue 链接：

!gh repo view --json owner,name -q '"https://github.com/" + .owner.login + "/" + .name + "/issues/{issue-number}"'
