# How to run the tests

The skill is instructions, so we test it by giving an AI tool a task in a sample app and checking what it does. Anyone can do this without reading code.

## Set up
1. Run `bash tests/setup-workspaces.sh` from the repo root. It builds folders in `~/Documents/mixpanel-skill-tests` (or the folder you pass as an argument). For every sample app you get two folders:
   - `<case>--WITHOUT-skill`: the plain app.
   - `<case>--WITH-skill`: the same app with the skill installed. By default it goes in `.claude/skills/` (Claude Code). For other tools set `SKILL_DIR`, for example `SKILL_DIR=.cursor/skills bash tests/setup-workspaces.sh` for Cursor or `SKILL_DIR=.agents/skills bash tests/setup-workspaces.sh` for Codex.
2. Each folder is its own small git repository, so you can see exactly what the AI changed with `git status` and `git diff`.

## Run one case
1. Open the folder for the case in your AI tool (open the folder itself, not the parent).
2. Start a new conversation and paste the prompt for the case (below).
3. If the AI asks questions, answer all of them in one message using the answers below, before approving anything. For anything not listed, say "You decide, keep it simple."
4. Note whether the AI changed any files before you approved. It should not.
5. Send the approval message for the case.
6. When it finishes, ask "How can I check this works?"
7. Score the run against `checklists.md`.
8. Repeat in the other folder (with and without the skill) and compare.

## Prompts and answers

**Case 01, first-time setup**
- Prompt: `This app has no analytics yet. Set up Mixpanel tracking for it.`
- Answers: main goal "Teams create a project and add tasks in their first week"; EU users "Yes, some"; data region "EU"; autocapture "No, manual events only".
- Approval: `Go ahead with everything you proposed as must-have. Skip anything you called nice-to-have.`

**Case 02, new onboarding replaces old**
- Prompt: `We just built a new 4-page onboarding in web/src/onboarding that replaces the old one in web/src/onboarding-old. Set up the Mixpanel tracking for the new onboarding.`
- Answers: goal "See how many people finish onboarding and where they drop off"; old events "Switch on a set date".
- Approval: same as case 01.

**Case 03, messy tracking**
- Prompt: `Audit and clean up our Mixpanel tracking.`
- Answers: `Mixpanel is our main tool, ignore Segment for now. Our project is in the EU. No automatic click or page tracking, manual events only.`
- Approval: `Approve everything under Safe to fix now.`

**Case 04, new feature**
- Prompt: `We just built a share project feature (web/src/share and api/routes/share.ts). Set up Mixpanel tracking for it.`
- Answers: `Goal: know how many people share projects and whether sharing brings in new users. Region: US. No EU visitors. No automatic tracking.`
- Approval: `Approve everything you proposed as must-have. Skip the nice-to-haves.`

**Case 05, events missing**
- Prompt: `Mixpanel shows almost no events from production and some look wrong. Figure out why.`
- Answers: `Our project is in the EU.`
- Approval: `Fix the ones you are most sure about.`

**Case 06, review a change**
- Prompt: `Review the tracking in change.diff before we merge it.`
- Approval: `Fix all of them.`

## If something goes wrong
- The with-skill run behaves like the without-skill run: start a new conversation and begin with `/mixpanel-tracking` (Codex: `$mixpanel-tracking`), and report that it did not start on its own.
- The AI asks for a Mixpanel token or key: reply "I do not have one, work from the code only", and report it as a failure.
