# Naming guide

Rule sources are tagged as in `mixpanel-concepts.md`: **[Mixpanel]** or **[Ours]**.

## Step 1: Detect the project's style first

Before naming anything, read the existing event names (the tracking plan file if there is one, otherwise the code). Work out:
- Casing: `snake_case`, `Title Case With Spaces`, `camelCase`, `PascalCase`, or `dot.notation`.
- Word order: Object Verb (`report_created`) or Verb Object (`created_report`).
- Tense: past (`viewed`, `completed`) or other.
- Where names live: inline strings, constants, an enum, or a wrapper.

If one style clearly dominates, follow it exactly, even if it differs from the default below. **[Ours]** Consistency matters more than the choice, and names are case-sensitive **[Mixpanel]**, so `Signup Completed` and `signup_completed` are two different events.

If no style exists, or the project has no tracking yet, use the default.

## The default style

**[Mixpanel]** Mixpanel recommends Object Verb (`song_played`, `page_viewed`) and describes snake_case as generally more robust.

Default: **snake_case, Object Verb, past tense.**

| Good | Why |
|---|---|
| `signup_completed` | Object then verb, snake_case |
| `onboarding_step_viewed` | Object then verb |
| `invite_sent` | Reads as a fact that happened |
| `payment_failed` | Outcome, not a button |

| Avoid | Problem |
|---|---|
| `Signup Completed`, `SignupCompleted` | Mixed with snake_case in one project splits data |
| `click_register_button` | Named after the interface, not the outcome |
| `button_clicked` with `label: "Register"` used for everything | Generic. Loses meaning and invites over-tracking |
| `purchase_11_01_2019` | **[Mixpanel]** Changing values do not belong in the name. Use `purchase_completed` and put the date in a property |
| `test_event`, `debug_click`, `foo` | Test data does not belong in production code |
| `user_signed_up_successfully_v2_final` | Version and mood words in names |

## Naming rules

1. **Name the user's action or its outcome, not the button text or component.** `plan_upgraded`, not `upgrade_button_clicked`, `hero_cta_clicked`.
2. **Object first, then a past-tense verb.** `report_exported`, `invite_accepted`.
3. **Be specific enough to stand alone.** `step_viewed` is vague. `onboarding_step_viewed` is clear.
4. **One name per meaning.** If `signup_completed` exists, do not add `user_registered` for the same moment.
5. **No changing values in the name.** Dates, IDs, plan names, page names and A/B variants go in properties.
6. **No abbreviations only the author understands.**
7. **Keep names short but complete.** Two or three words is usual.

## Verbs to prefer

| Moment | Verb |
|---|---|
| Something was shown | `viewed` |
| The user committed forward | `submitted`, `started`, `clicked` only for real commitments |
| The goal was reached | `completed`, `created`, `purchased`, `activated` |
| Something went wrong that matters | `failed` |
| The user chose to leave a flow | `skipped`, `dismissed`, `canceled` |
| The user shared or invited | `sent`, `accepted` |

## Property names

**[Ours]** unless marked.
- Same casing as event names (default snake_case). **[Mixpanel]** notes snake_case for properties too.
- Same name for the same concept everywhere: `plan`, not `plan` on one event and `planType` on another.
- Do not recreate Mixpanel default properties: browser, OS, current URL, referrer, screen size, device ID, UTM parameters. **[Mixpanel]**
- Do not use reserved names or the `$` prefix for your own properties. Never name a property `bucket` or `$bucket`. **[Mixpanel]**
- Correct types: numbers as numbers (`amount: 49.99`, not `"49.99"`), booleans as booleans, dates as ISO strings in UTC. **[Mixpanel]**
- Bounded, meaningful values: `plan: "pro"` is good. Free text typed by the user, long strings, and unbounded IDs are not. **[Mixpanel]** advises avoiding user-generated content and high-cardinality IDs.
- Booleans and enums beat free text: `state: "on" | "off"`.

- Do not add a version or flow tag to every event. Use one only where a kept event name would otherwise mix old and new data.

Common properties for flows:
| Property | Use |
|---|---|
| `step_name` | Which step, in a readable name |
| `step_number` | Position in the flow, as a number |
| `source` | Where the action came from (`"header"`, `"email"`) |
| `plan` | Plan at the time of the action |
| `error_type` | Category of failure, from a small fixed list |
| `method` | How something was done (`"google"`, `"email"`) |

## Super properties vs event properties

**[Mixpanel]** Super properties are added to every event. **[Ours]**
- Register a property as a super property only when it belongs on nearly every event (`plan`, `app_version`, `workspace_id`).
- Do not repeat a super property on individual events.
- Never register a value that varies by event.

## Renaming existing events

Renaming in code creates a new event and splits history **[Mixpanel]**: events cannot be renamed in Mixpanel. So:
1. Warn the user, with the exact event and where it fires.
2. Offer options: keep the old name, switch at a clear date, or fire both for a short transition.
3. Change nothing without approval.

## Fixing messy names

When cleanup finds mixed styles, propose a mapping table: current name, proposed name, why, files affected. Group by meaning (several names for one action become one). Let the user approve each row.

## Dynamic names

If code builds a name from a variable (for example a template string like `${page}_viewed` passed to `track`), you cannot know every resulting name. Do not guess. Flag it as unresolvable and recommend one event with a property. **[Ours]** Many dynamic names also risk growing toward Mixpanel's soft limit of 5000 distinct event names. **[Mixpanel]**
