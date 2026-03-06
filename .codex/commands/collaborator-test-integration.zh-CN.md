---
description: 执行项目集成测试流程
usage: /prompts:collaborator-test-integration
---

# 执行集成测试

执行项目的集成测试流程。

## 1. 验证构建产物

<!-- TODO: 替换为你项目的构建验证命令 -->
```bash
# 示例: npm run build / mvn package / make build
```

确认构建产物存在。

## 2. 运行集成测试

<!-- TODO: 替换为你项目的集成测试命令 -->
```bash
# 示例: npm run test:integration / mvn verify / pytest tests/integration/
```

## 3. 输出结果

报告集成测试结果：
- 通过/失败的测试数量
- 环境配置问题（如有）
- 失败详情和建议修复方向

如果测试失败，不要自动修复，等待用户决定。

## 下一步

测试通过后:
- 提交代码: `/prompts:collaborator-commit`
- 创建 PR: `/prompts:collaborator-create-pr`
