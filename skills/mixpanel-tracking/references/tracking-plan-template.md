# Tracking plan file

Every mode that changes tracking creates or updates one committed file that lists what the product tracks and why. Mixpanel describes a tracking plan as a centralised, living source of truth shared across teams. Later sessions, including other AI tools, read it first.

Default location: `docs/tracking-plan.md`. If the project already has a tracking plan file, update that one instead and keep its format where possible.

Keep it short. Do not paste code. Update it in the same change as the tracking code.

## Template

```markdown
# Tracking plan

Analytics tool: Mixpanel
Data region: <US | EU | India>
Naming convention: <e.g. snake_case, Object Verb, past tense>
Last updated: <date>

## Goals
<The few business questions this tracking exists to answer.>

## Events

| Event | What it tracks | Why we track it | Fires at | Side | Properties |
|---|---|---|---|---|---|
| signup_completed | An account was created | Measures activation | src/api/signup.ts:42 | server | method (string), plan (string) |

## Properties used on several events

| Property | Type | Meaning | Allowed values |
|---|---|---|---|
| plan | string | Plan at the time of the event | free, pro, team |

## Super properties (sent with every event)
- <name>: <meaning>

## Identity
- identify is called at: <file:line>, with: <stable user ID field>
- reset is called at: <file:line>

## Deliberately not tracked
- <thing>: <reason>

## Retired events
| Event | Retired on | Replaced by | Note |
|---|---|---|---|
| <old_name> | <date> | <new_name> | History before this date is under the old name in Mixpanel. |
```

## Rules for the AI

- Read this file first in every mode. Treat it as the list of what already exists.
- If the file and the code disagree, tell the user. Do not silently trust either.
- Add a row for every approved event. Remove or move rows for removed events into "Retired events".
- Keep "Deliberately not tracked" up to date. It stops the same noisy event being proposed again.
- Write plain English in "What it tracks" and "Why we track it". Someone who is not an engineer should understand it.

## Rules note for future AI sessions

Also add this short note to the project's `AGENTS.md` (or the equivalent rules file the project uses), or create it if none exists:

```markdown
## Analytics (Mixpanel)
- The list of tracked events is in `docs/tracking-plan.md`. Read it before adding or changing any tracking.
- Reuse an existing event or add a property before creating a new event.
- Follow the naming convention stated in the tracking plan.
- Do not add tracking for field focus, typing, hover or scroll.
- Propose new events with what they track and why, and wait for approval.
- Update the tracking plan in the same change.
```
