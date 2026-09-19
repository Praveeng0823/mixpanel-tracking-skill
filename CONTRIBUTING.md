# Contributing

Thanks for helping. This project is a skill: plain files that an AI coding tool follows. "Working" means the AI follows the instructions, so every change is judged by testing.

## Good first contributions
- Run the tests in a tool we have not tried (Cursor, Codex, others) and report what happened.
- Correct or update a Mixpanel rule. Every rule is either tagged **[Mixpanel]** with a source page in `skills/mixpanel-tracking/references/sources.md`, or **[Ours]** as our own recommendation. Please link the Mixpanel page when you change a rule.
- Add a sample app for a language or framework we cover thinly (Python, mobile).
- Improve wording so the output is clearer for non-engineers.

## The rules of the skill
Keep these when you change anything:
- The skill never connects to Mixpanel and never asks for tokens or keys.
- The AI reads the code first, asks only what code cannot answer, and stops for approval before any change.
- Replies are plain English for product managers and founders, with code words only in the "Technical details" section.
- Never claim an event is "unused" or "not firing" (the skill only sees code), and never say Mixpanel history is deleted.
- Do not copy Mixpanel's documentation text. Paraphrase and link.
- Keep `SKILL.md` short (under 500 lines). Put detail in `references/`.

## How to test a change
1. Run `bash tests/setup-workspaces.sh` to build a with-skill and a without-skill folder for every sample app.
2. Follow `tests/HOW-TO-TEST.md` and score against `tests/checklists.md`.
3. In your pull request, say which tool you used, which cases you ran, and what changed compared with before.

A small sample of runs is not proof, so please say how many runs you did.

## Pull requests
Keep them focused. Describe what problem you saw in a real run, what you changed, and how you checked it.
