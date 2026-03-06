---
description: 执行项目完整的测试流程（编译检查 + 单元测试）
usage: /prompts:collaborator-test
---

# 执行测试

执行项目完整的测试流程。

## 1. 编译 / 类型检查

<!-- TODO: 替换为你项目的编译命令 -->
```bash
# 示例: npx tsc --noEmit / mvn compile / go build ./...
```

确认编译无错误。

## 2. 运行所有单元测试

<!-- TODO: 替换为你项目的测试命令 -->
```bash
# 示例: npm test / mvn test / pytest / go test ./...
```

## 3. 输出结果

报告测试结果摘要：
- 通过/失败的测试数量
- 失败详情（如有）
- 建议的修复方向（如有失败）

如果测试失败，不要自动修复代码，等待用户决定。

## 下一步

测试通过后:
- 提交代码: `/prompts:collaborator-commit`
- 审查代码: `/prompts:collaborator-review-task <task-id>`
