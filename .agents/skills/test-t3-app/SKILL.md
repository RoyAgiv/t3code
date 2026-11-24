---
name: test-t3-app
description: Test T3 web UI in an isolated dev environment using the T3 preview panel or an authorized browser.
---

- Prefer the T3 preview panel; use an independently authorized browser if unavailable. Never bypass a permission denial.
- Reuse a healthy isolated dev server or run `vp run dev`. Use the worktree's ignored `.t3`; never use live `~/.t3/userdata` or set `VITE_HTTP_URL`/`VITE_WS_URL`. Read actual ports and pairing URL from startup.
- For SQLite fixtures, follow [references/sqlite-fixtures.md](references/sqlite-fixtures.md); stop the server before writes.
- Call `preview_status`, then `preview_open` if needed. Navigate once with `preview_navigate`; inspect with `preview_snapshot` and interact using the same tab. Generate a fresh token with `node apps/server/src/bin.ts pair` if consumed.
- Verify actual UI behavior; retain the healthy server and tab. Stop only your own processes. For sharing, run `vp run dev --share` and give the user the fresh, unconsumed full URL.
