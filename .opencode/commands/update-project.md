---
description: Update project AI collaboration configuration
agent: general
subtask: false
---

Update existing AI collaboration configuration to the latest version.

1. **Check current configuration**

!ls -la .agents/
!ls -la .ai-workspace/

If `.agents/` does not exist, respond:
"No existing configuration found. Use `/init-project` to initialize."
Then STOP.

2. **Backup current configuration**

!cp -r .agents/ .agents.backup.$(date +%Y%m%d%H%M%S)

3. **Update templates**

Compare and update `.agents/templates/task.md` with the latest template fields. Preserve any custom fields the user has added.

4. **Update workflows**

Compare and update workflow definitions in `.agents/workflows/`. Preserve custom workflows while updating standard ones.

5. **Verify directory structure**

Ensure all required directories exist:

!mkdir -p .ai-workspace/active
!mkdir -p .ai-workspace/blocked
!mkdir -p .ai-workspace/completed

6. **Report changes**

List all files that were updated, added, or left unchanged. Mention the backup location.

**Next step:** Review updated configuration files.
