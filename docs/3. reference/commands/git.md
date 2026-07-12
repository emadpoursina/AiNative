# Git commands

- Sync current branch with `development`: `/sync-branch` (or `node "$AINATIVE_HOME/scripts/ainative-link.mjs" machine` after adding new global commands)
- Removing a branch: `git branch -D [branch-name]`
- Creating a branch from development:
  - `git checkout development`
  - `git checkout -b [branch-name]`
  - `git push --set-upstream origin [branch-name]`
- Updating all branches with remote on GitHub: `git fetch origin --prune`
- `git stash push -m "Description"`

See [release-management-system.md](../../systems/release-management-system.md) for branch flow.
