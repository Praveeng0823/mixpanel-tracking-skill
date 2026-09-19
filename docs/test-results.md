# Test results so far

Six sample apps in `tests/fixtures/` were used to test the skill in Claude Code. Each case was run with the skill and, for cases 01 to 03, also without it. These are small samples (one run each), so treat them as evidence of behaviour, not proof. Tested in Claude Code only. Not yet tested in Cursor or Codex.

| Case | Mode | Without the skill | With the skill |
|---|---|---|---|
| 01 First-time setup | 1 | Asked no questions. Wrote 7 events in Title Case, put task and project IDs and name and email on profiles, added the browser SDK with automatic page views, never set the EU region. | Asked 5 labelled questions. Proposed 4 server-side events with no personal data and a list of what it left out. Warned that the payment provider may send the same event twice. |
| 02 Onboarding revamp | 3 | Designed almost the same events (one page-viewed event with properties, no field events). But it went straight to code, asked nothing, left the old events untouched, gave no history plan, and left no tracking plan. | Showed a plan first. Sorted the 13 old events into keep, change and remove. Explained the history effect. Changed only what was approved. Left a tracking plan file. |
| 03 Messy audit | 4 | Changed everything at once with no plan (deleted a Segment file, edited package.json, renamed properties), then narrowed after being told "certain only". | A full report separating safe fixes from decisions and setup problems, with what it could not see. Changed only the approved items. |
| 04 New feature | 2 | Not run | One server-side event through the existing helper. Rejected the noise. Changed only the two approved files. Flagged an existing bug and that it could not type-check. |
| 05 Events missing | 5 | Not run | Found both main causes (no EU setting, serverless function ending early). Applied only the items it said it would. Gave pass/fail steps to check. |
| 06 Review a change | 6 | Not run | Caught the duplicate, the email address in the event, the noise, the naming drift and the missing tracking plan row. |

## Final check before release
The finished skill was run once more, headless in Claude Code, on case 01 (first-time setup) and case 02 (onboarding), first turn only. Both followed the layout: short version first, plain English, one running number, labelled questions with the region as a blocking question, every file listed, a list of what was left out, and technical details last. Case 02 miscounted the old events (said 12, there are 13), which led to a new rule to check every stated number.

## What this shows
- For simple flows, Claude on its own designs similar events. The skill's value is the process: a plan first, questions about region and consent, plain-English explanations, handling of old tracking, no personal data, no quiet extras, and a tracking plan for later sessions.
- The biggest gap was in audits and in first-time setup.

## How to reproduce
Run `bash tests/setup-workspaces.sh`, then follow `tests/HOW-TO-TEST.md` and score against `tests/checklists.md`.
