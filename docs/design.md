# Design notes

Why this skill is built the way it is. The skill itself is in `skills/mixpanel-tracking/`, and those files are the source of truth for behaviour. This page explains the reasoning, so contributors know what to keep.

## What it is
A skill: plain files (instructions, references, examples and one small script) that an AI coding tool loads. It is not an app or a service. There is no server, account or dashboard.

## The problem
Asked to "add tracking", AI tools tend to act first and explain later. They add an event for every click, invent names next to old ones, leave old tracking behind, skip questions about the Mixpanel region and user consent, and put personal data in events. Nobody ends up with a clean list of what the product tracks.

## Positioning
Mixpanel ships its own skills ([mixpanel/ai-plugins](https://github.com/mixpanel/ai-plugins)) and other multi-tool skills exist ([Accoil/product-tracking-skills](https://github.com/Accoil/product-tracking-skills)). This skill does not claim to be first. It is the code-side companion:

> Works from your repo alone. Reuse-first and minimal. Cleans up naming drift, duplicates and dead events with evidence you can review. Nothing changes until you approve it.

What it adds, as far as we could tell from their docs when we compared:
- A code-only inventory with file and line evidence. Mixpanel's own audit starts from Lexicon and queries.
- An explicit list of what was left out, and why.
- A revamp mode that sorts old events into keep, change and remove, and a cleanup mode for names, duplicates and dead code.
- Approval item by item before anything changes.
- Plain-English replies for product managers and founders.
- Plain files that work in any tool that supports Agent Skills.

## Principles (please keep these)
1. **Code only.** It never connects to Mixpanel and never asks for tokens, keys or data. So it cannot know whether an event is unused or arriving, and it never claims to.
2. **Code first.** It reads the real code before advising. No generic templates.
3. **Ask only what code cannot answer.** At most five questions, labelled blocking or "I will assume". The data region is always blocking.
4. **Signal over noise.** No fixed event count. Every event must pass four tests (decision, implied, difference, removal), and the reply lists what was left out.
5. **Plain English.** Every reply opens with a short version, uses one running number, and keeps code words in a final "Technical details" section.
6. **Stop for approval.** Nothing changes until the user approves, and the AI applies exactly what was described.
7. **Honest about limits.** Certain findings are kept apart from judgment calls. Mixpanel cannot delete or rename events, and the skill explains what a change does to history.
8. **Every Mixpanel rule has a source or is labelled as ours.** See `references/sources.md`.

## Scope
- Six modes: first-time setup, new feature, revamp of an existing area, cleanup, troubleshoot, review a change.
- Best for JavaScript and TypeScript (web, React, Node) and Python. Mobile SDKs are best-effort.
- Not planned: reading live Mixpanel data, acting inside Mixpanel, migrating from other analytics tools, and multi-repository systems.

## How it is tested
A skill is judged by whether the AI follows it. Six small sample apps in `tests/fixtures/` cover every mode, with pass/fail checklists. Each case is run with and without the skill and compared. See `test-results.md` and `tests/HOW-TO-TEST.md`.

## Open work
- Tests in Cursor and Codex, reported by users of those tools.
- Mobile SDK sources (React Native, Swift, Android) and group analytics details in `references/sources.md`.
- More sample apps for Python and mobile.
- Re-check every Mixpanel rule against the live docs before each release.
