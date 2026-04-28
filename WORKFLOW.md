---
tracker:
  kind: linear
  project_slug: symphony-test-247a8832cb78
  active_states:
    - Todo
    - In Progress
  terminal_states:
    - Done
    - Cancelled
polling:
  interval_ms: 30000
workspace:
  root: ~/symphony-workspaces
hooks:
  after_create: "git clone https://github.com/dostonjohn/symphony.git . && git config user.name 'Symphony Agent' && git config user.email 'dostonjohn@users.noreply.github.com'"
agent:
  max_concurrent_agents: 3
  max_turns: 15
codex:
  command: codex --model gpt-5.5 -c model_provider=custom-gw --dangerously-bypass-approvals-and-sandbox --disable plugins --disable tool_call_mcp_elicitation --disable apps app-server
  approval_policy: never
  thread_sandbox: danger-full-access
  turn_timeout_ms: 900000
---

You are an autonomous software engineer working on {{ issue.identifier }}: {{ issue.title }}.

{{ issue.description }}

## Instructions
1. Read the codebase and understand existing patterns
2. Implement the requested changes
3. Write tests if applicable
4. Create a new branch, commit your changes, and push
5. Create a pull request using `gh pr create`
6. Update the Linear issue state to "Done"

## Important
- Do NOT ask for user input or confirmation. You are running autonomously.
- Use `gh pr create --fill` to create PRs without prompting.
- Commit with descriptive messages.
