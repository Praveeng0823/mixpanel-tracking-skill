# Example: revamp of a new 4-page onboarding

Fictional product: "Taskly". The team built a new 4-page onboarding to replace an older one that still has tracking. The naming style already in use is Title Case With Spaces, so the AI follows it. Notice: the old events are sorted into keep, change, remove and add in one running numbered list, and identity and consent are kept separate.

````
MODE: revamp. Tell me if you want a different mode.

## The short version
- What I looked at: the old onboarding and the new 4-page onboarding, and every tracking call in the old one.
- What I recommend: 3 events for the new onboarding, replacing 13 old ones.
- I have not changed anything yet.
- I need 3 decisions from you. They are at the end.

## Step 1: What I found in your product
- The old onboarding has 3 steps and a done screen, and records 13 different events.
- Most of those events are noise: they record clicking into a field, typing, going back, and opening a tooltip.
- The new onboarding has 4 pages (account, workspace, invite teammates, choose a plan) and records nothing yet.
- Your existing event names use Title Case, so I will follow that.
- Nothing links these events to a known person yet, so all onboarding activity would look anonymous.

## Step 2: What you want to learn
Everything below is built to answer these questions:
1. How many people reach each of the 4 pages?
2. Where do they drop off?
3. How many finish onboarding?

## Step 3: What happens to your existing events, and what I recommend
Because of those questions, here is each old event and what to do with it. Then the new ones.

**Keep**
1. `Onboarding Completed`: keep the name. It is the right success event, and keeping it means your history continues. Only the moment it is recorded moves to the new flow.

**Change**
2. `Onboarding Step 1 Viewed`, `Step 2 Viewed`, `Step 3 Viewed` (3 events): right idea, but one event per step is hard to compare. Replace them with the new event in item 4.

**Remove** (each one is recorded only by the old flow and answers none of your questions)
3. `Name Field Focused`, `Email Field Focused`, `Name Typed`, `Onboarding Back Clicked`, `Onboarding Tooltip Opened`, `Onboarding Skipped Step 3`, and the button-click events for steps 1, 2 and 3 (9 events). Noise, or they belong to buttons the new flow does not have.

**Add**
4. `Onboarding Step Viewed`
   - What it tells you: how many people see each page.
   - Why it matters: it gives you the drop-off between pages (questions 1 and 2). One event with the step recorded as a detail replaces per-page events.
   - When it is recorded: whenever one of the 4 pages appears.
   - Details recorded with it: which step (1 to 4) and its name (account, workspace, invite, plan).
5. `Onboarding Step Completed`
   - What it tells you: how many people press the main button on each page.
   - Why it matters: it carries choices the next page's view does not have: team size, number of invites sent, and the plan chosen.
   - When it is recorded: when someone presses Register, Continue, Send invites or Finish.
   - Details recorded with it: the step, plus team size, invite count or plan where relevant.

**Also (already covered by item 1):** the final page's completion is recorded by `Onboarding Completed`, so I do not record a separate step-4 completion. That avoids two events for the same moment.

**Left out:** typing or clicking in the name, email or mobile fields (no decision depends on it), a "moved to next page" event (the next page's view already proves it), one viewed event per page (item 4 does the same job), back, hover and scroll (no question depends on them), and invite email addresses (personal information, so I only record the count).

## Step 4: What this means for your Mixpanel history
Mixpanel cannot delete or rename events. The old events keep their data but stop growing. `Onboarding Completed` continues, so its numbers mix old and new onboarding for a while. Two options:
- **A. Switch on a set date:** remove the old tracking when the new onboarding ships. Charts that cross the date need both old and new events.
- **B. Record both for two weeks,** then remove the old ones.

## Step 5: Optional, separate decisions
Approving items 1 to 5 does not approve these.
- **Linking events to a known person:** after someone registers, tell Mixpanel who they are, using your database user ID (never their email). Without it, the first page view and the later steps will not be joined to one person. I need to know where your server returns the ID.
- **Waiting for consent:** your Mixpanel project uses the EU host, which suggests EU visitors. Tracking may need permission first. This is engineering guidance, not legal advice.

## Step 6: What will change in your project
- I will edit: the four new onboarding pages, the main onboarding component, and the old onboarding files (only to remove tracking calls, if you choose option A).
- I will create: one small helper file for the onboarding events, and a tracking plan file (`docs/tracking-plan.md`).
- I will not touch: anything else, and I will not delete any old onboarding files.

## Your decisions
Questions:
- Q1 (I will assume yes unless you say otherwise): Is finishing onboarding the goal, with the Free or Pro choice as a signal?
- Q2 (blocking): Is the old onboarding fully retired, or does it still serve some people?
- Q3 (blocking): Option A or B for the old events?

How to reply:
- "Approve 1, 4 and 5. Remove the old events (2 and 3) using option A."
- "Go with your assumptions."
I will not change any code until you reply.

## Technical details (for your developer)
| # | Event | Where it is recorded | Side | Details and types | Tests passed |
|---|---|---|---|---|---|
| 1 | Onboarding Completed | web/src/onboarding/Page4.tsx, Finish handler, before the redirect | browser | plan (string) | all four |
| 4 | Onboarding Step Viewed | web/src/onboarding/Onboarding.tsx, one effect keyed on the page | browser | step_number (number), step_name (string) | all four |
| 5 | Onboarding Step Completed | each page's button handler | browser | step_number, step_name, team_size (number), invites_sent (number), plan (string) | all four |
Notes: the Finish button reloads the page, so send the last event with the beacon transport (verify against the installed library version). Guard the viewed effect against React's double run in development. Old events are in web/src/onboarding-old/Step1.tsx, Step2.tsx, Step3.tsx and Done.tsx.
````
