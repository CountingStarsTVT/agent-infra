---
name: release
description: >
  执行版本发布流程。当用户要求发布版本时触发。参数为版本号（X.Y.Z）。
---

# 版本发布

## 执行步骤

1. 解析并验证版本号（X.Y.Z 格式）。
2. 检查工作区状态（需要干净的工作目录）。

<!-- TODO: 在下方添加你的项目发布步骤 -->

3. 更新项目文件中的版本引用。
   ```bash
   # 示例: 更新 package.json / pom.xml / setup.py 中的版本号
   ```

4. 创建发布提交。
   ```bash
   git add .
   git commit -m "chore: release vX.Y.Z"
   ```

5. 创建 git tag。
   ```bash
   git tag -a vX.Y.Z -m "Release vX.Y.Z"
   ```

6. 提供回滚说明。

**注意**: 不要自动推送，让用户审查后推送。
