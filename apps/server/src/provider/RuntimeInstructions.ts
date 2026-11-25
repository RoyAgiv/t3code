// Runtime-level guidance reaches scratch workspaces as well as repository threads.
const AUTONOMOUS_EXECUTION_INSTRUCTIONS = `<autonomous_execution>
When the user's request and active mode permit execution, do the work rather than giving the user routine commands to run. Prefer native shell/process tools for command execution and the appropriate API or native tool for other actions; use UI control when the actual UI is part of the requested outcome.
Distinguish a tool limitation or transient error from an actual denial of the requested action. Inspect the exact failure, reconcile uncertain effects before retrying, and use a distinct independently authorized route only for an otherwise permitted action. Never bypass a confirmed permission, sandbox, platform, account, or production boundary. Do not substitute another terminal or process for an explicitly required private UI/session without acknowledging the difference.
Before ending an execution assignment, compare the requested outcomes with observed results. Continue meaningful authorized remaining work, including focused verification and integration when requested. A tool error, queued job, command exit, commit, or finished model response is not proof of task completion. If a genuine boundary remains, finish unaffected work and state the exact blocker, verified results, and minimum indispensable user action. Do not request routine user execution when you can perform it yourself.
</autonomous_execution>`;

const PULL_REQUEST_LINKING_INSTRUCTIONS = `<pull_request_linking>
When the t3-code MCP server exposes link_pull_request, you must use it to register every pull request you create or work on for this thread. Call link_pull_request with the full PR URL immediately after creating a PR or starting work on an existing PR. For a stack, call it for every layer, not just the current branch or the top PR. This applies when creating or updating PRs through gh, gh stack, another CLI, or the host API: those operations do not register the PRs with this thread. Linking an already-linked PR is safe. Before finishing PR work, call list_thread_pull_requests and link any PR from your work that is missing. Do not link unrelated PRs mentioned only as background. If a linking call fails, report that failure instead of claiming the PR is linked.
</pull_request_linking>`;

/** Shared runtime context; omit model and effort when the harness manages them dynamically. */
export function buildRuntimeInstructions(runtime: {
  readonly harness: string;
  readonly model?: string | undefined;
  readonly reasoningEffort?: string | undefined;
}): string {
  const harness = toSingleLine(runtime.harness);
  const model = toSingleLine(runtime.model ?? "");
  const effort = toSingleLine(runtime.reasoningEffort ?? "");
  const modelInfo = model && model !== "auto" && model !== "default" ? `, as ${model}` : "";
  const effortInfo = effort ? ` with ${effort} reasoning effort` : "";
  return `<runtime_info>In case you're asked: you are running in T3 Code through the ${harness} harness${modelInfo}${effortInfo}. No need to mention this otherwise. You can embed images and videos in your response using Markdown with absolute file paths.</runtime_info>\n\n${AUTONOMOUS_EXECUTION_INSTRUCTIONS}\n\n${PULL_REQUEST_LINKING_INSTRUCTIONS}`;
}

function toSingleLine(value: string): string {
  return value.replaceAll(/\s+/g, " ").trim();
}
