# Mixpanel Tracking Skill

A free, open-source skill that makes your AI coding tool set up, extend and clean up **Mixpanel** tracking properly, by reading your code first, explaining every event in plain English, and waiting for your approval before it changes anything.

It is just files. There is no app, no account, no server. It never connects to Mixpanel and never asks for your Mixpanel keys.

> Not affiliated with or endorsed by Mixpanel. Mixpanel already offers its own skills at [mixpanel/ai-plugins](https://github.com/mixpanel/ai-plugins). This one is a code-side companion that works from your repo alone.

## Who it is for

Product managers, founders, growth leads and developers who ask an AI tool to "add tracking" and get noisy, inconsistent events, duplicates, and old tracking left behind.

## What goes wrong without it

AI tools tend to act first and explain later. They add an event for every click, invent new names next to old ones, leave the old tracking in place, skip questions about your Mixpanel region and user consent, and put personal data into events.

## What it does

You ask in normal words. The skill picks one of six modes:

| You say | Mode |
|---|---|
| "Set up Mixpanel tracking" (project has none) | First-time setup |
| "Add tracking for the share feature" | New feature |
| "We built a new onboarding, set up its tracking" | Revamp of an existing area |
| "Audit and clean up our Mixpanel tracking" | Cleanup |
| "Events aren't showing up in Mixpanel" | Troubleshoot |
| "Review the tracking in this pull request" | Review a change |

Every mode follows the same rules:
1. **Reads your code first.** No generic templates.
2. **Asks only what code can't tell it** (your goal, your data region, EU visitors), at most five questions.
3. **Keeps tracking small.** An event is proposed only if it answers a real question. It also lists what it left out and why.
4. **Explains in plain English.** For each event: what it tells you, why it matters, when it is recorded, and which details come with it. Code words go in a separate "Technical details" section at the end.
5. **Lists every file it will change** before it changes anything.
6. **Stops and waits.** You reply "approve 1, 2 and 4" and it changes only those.

## A real before and after

Task: "We built a new 4-page onboarding that replaces the old one. Set up the Mixpanel tracking." (Claude Code, small sample app; see [docs/test-results.md](docs/test-results.md).)

| | Without the skill | With the skill |
|---|---|---|
| Showed a plan first | No, it went straight to code | Yes, and waited for approval |
| Asked questions | None | Goal, EU consent, where the user ID comes from, whether the old flow is retired |
| Old onboarding's 13 events | Left untouched | Sorted into keep, change and remove, with reasons |
| What happens to your Mixpanel history | One line | Explained, with a choice of how to switch |
| Tracking plan for future AI sessions | No | Yes |

Honest note: for a simple flow, Claude on its own picked almost the same events. The skill's value is the process around them, and it showed the biggest difference on audits and first-time setup.

## Install

**Easiest, for any supported tool:**
```bash
npx skills add Praveeng0823/mixpanel-tracking-skill
```
The [skills CLI](https://github.com/vercel-labs/skills) finds the skill in this repo and asks which AI tools to install it for.

**By hand:** copy the folder `skills/mixpanel-tracking` into your tool's skills folder, then restart the tool.

| Tool | This project only | All your projects | Start it by name |
|---|---|---|---|
| Claude Code | `.claude/skills/` | `~/.claude/skills/` | `/mixpanel-tracking` |
| Cursor | `.cursor/skills/` or `.agents/skills/` | `~/.cursor/skills/` or `~/.agents/skills/` | `/mixpanel-tracking` |
| Codex | `.agents/skills/` | `~/.agents/skills/` | `$mixpanel-tracking` |

After copying, restart the tool so it picks the skill up. To check it loaded: in Cursor open **Customize → Skills**, in Codex type `/skills`, in Claude Code type `/` and look for `mixpanel-tracking`.

Notes: Cursor does not copy user-level skills (`~/.agents/skills/`, `~/.cursor/skills/`) to Cloud Agents or remote sessions, so use the project-level folder there. A Cursor Marketplace listing and a Claude Code plugin are planned. The skill script needs `bash`. Without it, the AI searches the code itself.

You usually do not need to start it by name. Just ask in normal words, for example "Audit and clean up our Mixpanel tracking", and the tool loads it when the request matches. The folders above come from each tool's own documentation ([Claude Code](https://code.claude.com/docs/en/skills), [Cursor](https://cursor.com/docs/skills), [Codex](https://developers.openai.com/codex/skills)). The skill follows the open [Agent Skills format](https://agentskills.io/specification).

## What it will not do

- It does not connect to Mixpanel, so it can't tell you which events are unused or whether events arrive. It reads code only.
- It cannot delete or rename events inside Mixpanel, because Mixpanel does not allow it. It explains what a change does to your history and gives you a checklist to review in Mixpanel yourself.
- It gives engineering guidance on consent and privacy, not legal advice.

## Status and limits

- Version 0.1.0.
- Tested in Claude Code only, on small sample apps (one run per case). Cursor and Codex read the same skill format and folders (see the table above), but we have not run our tests in them yet. If you try it there, please open an issue and tell us what happened. `tests/HOW-TO-TEST.md` explains how.
- Best for JavaScript and TypeScript (web, React, Node) and Python. Mobile SDKs are best-effort.
- Mixpanel's rules come from its public docs, listed with sources in [skills/mixpanel-tracking/references/sources.md](skills/mixpanel-tracking/references/sources.md). Docs change, so please report anything out of date.

## What's in the repo

```
skills/mixpanel-tracking/   the skill (SKILL.md, references, examples, script)
.cursor-plugin/             plugin manifest, for a future Cursor Marketplace listing
tests/                      six sample apps and pass/fail checklists
docs/                       design notes and test results
```

## Contributing

Issues and pull requests are welcome, especially tests in other AI tools and corrections to Mixpanel rules. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE), by Praveen Gondi.
