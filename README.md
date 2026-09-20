# Mixpanel Tracking Skill

**Set up, extend and clean up Mixpanel tracking with your AI coding tool. It reads your code, explains every event in plain English, and waits for your approval before it changes anything.**

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Version](https://img.shields.io/badge/version-0.1.0-informational)

A free, open-source skill for Claude Code, Cursor and Codex. It is a set of instruction files. It is not an app, and it needs no account and no server.

> Not affiliated with or endorsed by Mixpanel. Mixpanel has its own skills at [mixpanel/ai-plugins](https://github.com/mixpanel/ai-plugins). This one is a companion that works from your code alone.

---

## Contents

1. [Why use it](#why-use-it)
2. [Quick start](#quick-start)
3. [What you can ask it to do](#what-you-can-ask-it-to-do)
4. [What a reply looks like](#what-a-reply-looks-like)
5. [How it works](#how-it-works)
6. [Test results](#test-results)
7. [Install in detail](#install-in-detail)
8. [What it does not do](#what-it-does-not-do)
9. [Status and limits](#status-and-limits)
10. [What is in this repository](#what-is-in-this-repository)
11. [Contributing and license](#contributing-and-license)

---

## Why use it

When you ask an AI tool to "add tracking", it often does the following. We saw this in our own tests (see [Test results](#test-results)).

- It changes code straight away, without showing a plan.
- It skips questions that matter, such as your Mixpanel data region and whether users must agree to tracking.
- It leaves old tracking in place when you replace a feature.
- It puts personal data, such as emails, into events.

This skill changes that. Before it touches any code it:

- **reads your code** to see what is already tracked,
- **asks only what the code cannot tell it**,
- **proposes the fewest events** that answer your real questions, and lists what it left out,
- **explains each event in plain English**, and
- **stops and waits** until you approve.

It is written for product managers, founders and growth leads, as well as developers.

## Quick start

**1. Install**

```bash
npx skills add Praveeng0823/mixpanel-tracking-skill
```

The command takes the repository name. It finds the skill in this repository's `skills/mixpanel-tracking/` folder for you, then asks which AI tools to install it for. Restart the tool afterwards.

In the list of tools, make sure **Claude Code** is ticked. To skip the menu and install for Claude Code, for all your projects, run:

```bash
npx skills add Praveeng0823/mixpanel-tracking-skill -g -a claude-code
``` Other ways to install are in [Install in detail](#install-in-detail).

**2. Ask in normal words**

```text
Audit and clean up our Mixpanel tracking.
```

You do not need to name the skill. Your tool loads it when the request matches.

**3. Read the plan, then reply**

The skill shows a plan and stops. Reply with what to approve, for example:

```text
Approve 1, 2 and 4. Skip the rest.
```

It changes only what you approved.

## What you can ask it to do

| You say | What the skill does |
|---|---|
| "Set up Mixpanel tracking." (the project has none) | **First-time setup.** Proposes a small starter set of events and the setup around them. |
| "Add tracking for our new share feature." | **New feature.** Reuses events you already have and adds only what is missing. |
| "We built a new onboarding. Set up its tracking." | **Revamp.** Sorts the old events into keep, change and remove, then proposes a clean new set. |
| "Audit and clean up our Mixpanel tracking." | **Cleanup.** Finds duplicates, bad names, test events and setup problems, and fixes only what you approve. |
| "Events are missing in Mixpanel. Why?" | **Troubleshoot.** Lists the likely causes, most likely first, and how to confirm each one. |
| "Review the tracking in this pull request." | **Review.** Checks a change for duplicates, noise and personal data before you merge. |

## What a reply looks like

This is a shortened version of the top of a real cleanup reply from our tests, on a sample app:

```text
MODE: cleanup

## The short version
- I checked 12 Mixpanel event calls across 9 files.
- Safe to fix now: 3 things. Needs your decision: 7 things.
  Setup problems: 6 things.
- I have not changed anything yet.
- My advice: approve items 1-3, then answer the questions at the end.

## Step 2: Safe to fix now
1. Remove the "debug click" event on the Menu button.
   Why it matters: it is a leftover that adds noise.
2. The plan price is sent as text ("49.99"), not a number.
   Why it matters: Mixpanel cannot add up text, so revenue
   reports will not work.
```

Every reply follows the same layout:

1. A short summary first.
2. Plain English, in numbered steps that follow on from each other.
3. One running number for every item, so you can reply "approve 1 and 3".
4. What it left out, and why.
5. A list of every file it will change.
6. Technical details for your developer, at the end.

## How it works

1. **Code first.** It reads the real code. It never proposes events from a generic template.
2. **Few questions.** It asks at most five. Your Mixpanel data region is always one of them, because a wrong region fails silently.
3. **Minimum events.** An event is proposed only if it answers a real question. It must pass four tests: does it feed a decision, is it already implied by another event, does it differ from a similar event, and would you miss it if it were gone.
4. **Plain English.** Each event is explained as what it tells you, why it matters, when it is recorded, and which details come with it.
5. **Approval first.** Nothing changes until you approve, and it applies exactly what it described.

Mixpanel's own rules are built in, with sources. They cover naming, identity, autocapture, limits, privacy and data regions. See [`references/sources.md`](skills/mixpanel-tracking/references/sources.md).

## Test results

We ran the skill on small sample apps in Claude Code, with and without the skill. Here is one case: a new 4-page onboarding replaces an old one.

| | Without the skill | With the skill |
|---|---|---|
| Showed a plan first | No, it went straight to code | Yes, and waited for approval |
| Asked questions | None | Goal, EU consent, where the user ID comes from, whether the old flow is retired |
| The old onboarding's 13 events | Left untouched | Sorted into keep, change and remove, with reasons |
| What happens to your Mixpanel history | One line | Explained, with a choice of how to switch |
| A tracking plan for future AI sessions | No | Yes |

Two honest notes:

- On a simple flow, Claude on its own chose almost the same events. The skill adds the process around them. The biggest gains were in audits and first-time setup.
- These are small samples with one run per case. Full results are in [docs/test-results.md](docs/test-results.md).

## Install in detail

**With the skills CLI (all supported tools):**

```bash
npx skills add Praveeng0823/mixpanel-tracking-skill
```

**By hand:** copy the folder `skills/mixpanel-tracking` into your tool's skills folder, then restart the tool.

| Tool | This project only | All your projects | Start it by name |
|---|---|---|---|
| Claude Code | `.claude/skills/` | `~/.claude/skills/` | `/mixpanel-tracking` |
| Cursor | `.cursor/skills/` or `.agents/skills/` | `~/.cursor/skills/` or `~/.agents/skills/` | `/mixpanel-tracking` |
| Codex | `.agents/skills/` | `~/.agents/skills/` | `$mixpanel-tracking` |

**Check that it loaded:** in Cursor open **Customize → Skills**. In Codex type `/skills`. In Claude Code type `/` and look for `mixpanel-tracking`.

**Notes**

- Cursor does not copy user-level skills to Cloud Agents or remote sessions. Use the project folder there.
- The helper script needs `bash`. Without it, the AI searches your code itself.
- The folders come from each tool's documentation: [Claude Code](https://code.claude.com/docs/en/skills), [Cursor](https://cursor.com/docs/skills), [Codex](https://developers.openai.com/codex/skills). The skill follows the open [Agent Skills format](https://agentskills.io/specification).

## What it does not do

- **It does not connect to Mixpanel.** It reads your code only, so it cannot tell you which events are unused or whether events arrive. The skill makes no network calls of its own. Your AI tool still sends your code to its own model provider, as it always does.
- **It cannot delete or rename events inside Mixpanel.** Mixpanel does not allow it. The skill explains what a change does to your history and gives you a checklist to review in Mixpanel yourself.
- **It is not legal advice.** Its notes on consent and privacy are engineering guidance.

## Status and limits

- **Version 0.1.0.**
- **Tested in Claude Code only,** on small JavaScript and TypeScript sample apps, with one run per case. Cursor and Codex read the same skill format and folders, but we have not run our tests in them yet. If you try it there, please [open an issue](https://github.com/Praveeng0823/mixpanel-tracking-skill/issues/new/choose) and tell us what happened.
- **Written for** JavaScript and TypeScript (web, React, Node) and Python. Python and mobile SDKs are not tested yet.
- **Mixpanel's rules come from its public docs.** Docs change, so please report anything out of date.

## What is in this repository

```text
skills/mixpanel-tracking/   The skill itself: SKILL.md, references/, examples/, scripts/
tests/                      Six sample apps, pass/fail checklists, setup script
docs/                       Design notes and test results
.cursor-plugin/             Plugin manifest for a future Cursor Marketplace listing
.github/                    Issue template for test reports
README.md                   This page
CONTRIBUTING.md             How to help
CHANGELOG.md                What changed in each version
LICENSE                     MIT license
```

## Contributing and license

Issues and pull requests are welcome, especially test reports from Cursor and Codex and corrections to Mixpanel rules. See [CONTRIBUTING.md](CONTRIBUTING.md). To run the tests, see [tests/HOW-TO-TEST.md](tests/HOW-TO-TEST.md).

Released under the [MIT License](LICENSE). Created by Praveen Gondi.
