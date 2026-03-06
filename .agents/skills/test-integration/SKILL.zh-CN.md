---
name: test-integration
description: >
  执行项目集成测试流程。
  当用户要求运行集成测试或端到端验证时触发。
---

# 运行集成测试

## 1. 验证构建产物

<!-- TODO: 替换为你的项目构建验证命令 -->
```bash
# 示例: npm run build / mvn package / make build
```

## 2. 运行集成测试

<!-- TODO: 替换为你的项目集成测试命令 -->
```bash
# 示例: npm run test:integration / mvn verify / pytest tests/integration/
```

## 3. 输出结果

报告集成测试结果：
- 通过/失败的测试数量
- 环境问题（如有）
- 失败详情和建议

如果测试失败，不要自动修复，等待用户决定。
