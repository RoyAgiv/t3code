---
name: test-t3-mobile
description: Build, pair and test the T3 mobile app on an authorized simulator or device.
---

- Use `device_list`, `device_open` for the selected host/device, its returned `quickStart`, exact `agentDevice.command` and all `targetArgs`; inspect via `device_screenshot`. Use only independently authorized fallbacks.
- Reuse an isolated backend or run `vp run dev` with worktree `.t3`, never live `~/.t3/userdata`. Follow [SQLite fixture guidance](../test-t3-app/references/sqlite-fixtures.md); stop backend before fixture writes.
- Run `node scripts/mobile-native-client.ts ensure <ios|android> <device-id>` (build if needed unless prohibited), then `vp run dev:client` in `apps/mobile`. Ensure the device can reach Metro and backend. Use the returned AgentDevice command and arguments to `open com.t3tools.t3code.dev <url>`.
- Pair using `.agents/skills/test-t3-mobile/scripts/pair-client.sh <server-port> <base-dir> <device-reachable-backend-origin> "$agent_device_command" "${agent_device_target_args[@]}"`. For local backend use iOS `http://127.0.0.1:<server-port>`, Android `http://10.0.2.2:<server-port>`, or a reachable remote origin.
- Exercise and verify the real UI; retain healthy resources for follow-up. On teardown remove only disposable connections, call `device_close`, and stop only your processes.
