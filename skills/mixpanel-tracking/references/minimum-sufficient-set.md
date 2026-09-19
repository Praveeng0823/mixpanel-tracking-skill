# The minimum sufficient set

Read this before proposing any event. AI tools over-track by default. Your job is to find the smallest set of events that still answers the real questions, and to give a reason for every event you keep.

There is no fixed event count. A flow that needs three events gets three. A flow that genuinely needs eight gets eight, and the reasoning shows why. Mixpanel's own guidance is that tracking everything a user can do leads to unnecessary development effort and unused data, and that you should prioritise what your goals need and then iterate.

## Step 1: Write down the questions

Before naming any event, write the questions the data must answer. Examples:
- How many people reach each step?
- Where do people drop off?
- How many finish?
- Which plan do people choose?
- Does the new feature get used after the first try?

If you cannot write a question, you are not ready to propose events. Ask the user (see `thinking-checklist.md`, "Questions only the user can answer").

## Step 2: Find the least tracking that answers them

For each question, list the moments in the code that answer it. Then remove any moment that another event already proves.

## Step 3: Test every candidate

An event survives only if it passes all four tests. Write the result for each test.

| Test | Question to ask | Fails when |
|---|---|---|
| Decision | Which decision, metric or funnel step does this event feed? | You cannot name one. |
| Implied | Is this already proven by another event? | A later event could only happen if this one did. |
| Difference | If two events look alike, what different thing does each tell us? | You cannot state a difference. Keep one. |
| Removal | If we deleted this event, which question could we no longer answer? | Every question is still answerable. |

## What to track and what not to

**Track meaningful moments:**
- A page or step viewed.
- The primary action that commits the user forward (submit, register, upgrade, purchase, invite).
- A flow or goal completed.
- A failure that changes what the user experiences or that the business must act on.
- Server-confirmed outcomes such as payments and account creation.

**Do not track interactions:**
- Focus, blur, keystrokes, or field-by-field changes in a form.
- Hovers, scrolls, tab switches, tooltips, modals opened without a decision.
- A click on every button or link.
- Anything autocapture already records, if autocapture is on.
- Anything the tool can compute: drop-off comes from funnel steps, and duration comes from `time_event` or a duration property, not from extra events.
- Values that change per event in the event name. Put them in properties.

**A click is tracked only when** it is a commitment (the primary call to action, a submit, an upgrade) and the outcome behind it is not already tracked. If the click leads to a tracked success, track the success and drop the click, unless you can state what the click adds (for example, a click with no success after it means a failed or abandoned attempt).

## Step completed and submit events: be honest about what they add

A "step completed" or "submit" event is worth keeping only for one of these reasons. State which one:
- **It can fail.** If the button can fail or be abandoned after the click (validation, a server call), the submit shows attempts that never reach the next step.
- **It carries useful details.** For example team size, number of invites sent, or the plan chosen, which the next step's view does not have.

If the button just moves on with no possible failure and carries nothing useful, drop it: the next step's view already proves it.

Also drop overlaps. If the last step's completed event and the whole-flow completed event fire at the same moment, keep one. Put the useful details on it.

## Do not add version tags to every event

Do not add a property such as `flow_version` to every event by default. New event names already separate new data from old. Add a version detail only where an existing event name is kept and old and new data would otherwise mix into one number, and say why.

## Prefer properties to new events

Mixpanel's server-side guidance says to track pages as an event property, not as separate events. We apply that to steps and flows generally. Follow these rules:
- Pages and steps: one event (for example `onboarding_step_viewed`) with `step_name` and `step_number`, not one event per page.
- Errors, sources, variants and plan types: properties, not new events.
- Two events that differ only by a value (`toggle_on`, `toggle_off`) become one event with a `state` property.
- If the project already uses one event per page, follow the project and do not mix both styles.

## Tiers

Sort every candidate into one tier:
- **Must-have:** needed to answer the core questions.
- **Nice-to-have:** useful but optional. Off by default. The user opts in.
- **Skip:** rejected, with a reason.

## Rejected candidates are required output

Always list what you considered and dropped, with the reason. The user must be able to see your restraint and reverse any decision. A proposal with no rejected candidates is incomplete.

## Self-check before you present

Go through the list once more:
1. For each event: "If we removed this, which decision could we no longer make?"
2. Can any two events merge into one event plus a property?
3. Does any event repeat something autocapture, a default property, or an existing event already gives?
4. Is any event about how the interface behaves, not what the user achieved?
5. Are you tracking a click when the outcome behind it is already tracked?

Remove or merge anything that fails.

## Worked example: a 4-page onboarding

Page 1 has three inputs (name, email, mobile number) and a Register button. Pages 2 to 4 follow the same pattern.

Questions: how many people reach each step, where do they drop off, how many finish.

| Proposed | Why |
|---|---|
| `onboarding_step_viewed` with `step_name`, `step_number` | One event covers all four pages. It shows who saw each step and builds the funnel by filtering on the property. |
| `onboarding_step_submitted` with `step_name`, `step_number` (on the primary button) | The commitment to move on. A submit with no next step view means a failed or abandoned attempt. |
| `onboarding_completed` | The success moment the flow exists for. |

| Rejected | Why |
|---|---|
| Click or focus on name, email or mobile field | Interaction noise. The view shows they saw the form and the submit shows they acted on it. |
| Typing in any field | No decision depends on it. |
| A "moved to next page" event | The next step's viewed event already proves it (implied test). |
| One viewed event per page | One event with a `step_name` property does the same job and is what Mixpanel's guidance favours (difference test). |
| Hover, scroll and other clicks | No question depends on them (decision test). |

Reasoning to show the user: "We know they saw the step from the viewed event. We know they committed from the submit. We know they moved on from the next step's viewed event. Nothing else is needed to answer where people drop off."

## In cleanup mode

Apply the same tests to existing events. Flag as noise candidates: high-frequency interaction events (input focus, keystrokes, hovers), events implied by other events, and one-per-page events that should be one event with a property. Mark these as judgment calls, never as certain.
