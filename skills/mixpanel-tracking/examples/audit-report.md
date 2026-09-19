# Example: cleanup audit

Fictional product: "Taskly". Notice four things: one running number across the whole report; "Safe to fix now" holds only fixes with no downside and no choice; everything else, even when the problem is certain, is under "Needs your decision"; and the region is a blocking question, never assumed.

````
MODE: cleanup. Tell me if you want a different mode.

## The short version
- I checked: 14 tracking calls in 12 files.
- Safe to fix now: 2 things. Needs your decision: 6 things. Setup problems: 4 things. Only you can check in Mixpanel: 2 things.
- I have not changed anything yet.
- My advice: approve "Safe to fix now", then settle items 3, 9 and 10. They matter most.

## Step 1: What your tracking looks like today
- Event names come in three styles mixed together (Title Case, snake_case and camelCase), so there is no single style.
- The same moment, someone signing up, is recorded under three different names and from two places, so it is counted twice.
- Some events are leftovers: two test events, and events that record clicking into a form box.
- Your website and your server record events about the same person under different IDs, so one person looks like two.
- A second tool (Segment) also records events, and nothing sets a Mixpanel region.

## Step 2: Safe to fix now
The code alone proves these, and fixing them has no downside and needs no choice from you.
1. **Two test events are recorded in your live product** (`debug_click`, `test_event`). They mean nothing to your users. Fix: remove both.
2. **The billing event sends the price as text** ("49.99"), so Mixpanel cannot add prices up. Fix: send the number 49.99.

## Step 3: Needs your decision
These need a choice from you, or depend on things I cannot see. I say how sure I am.
3. **Signup is recorded under three names** (`Signup Completed`, `signup_completed`, `signupCompleted`). I am sure they describe the same moment. Mixpanel treats different spellings as different events, so signups are counted about twice. Suggestion: keep the server one, `signup_completed`, and remove the other two. If I am wrong about the old page being unused: its signups would stop being counted. How sure I am that it is unused: low to medium, because I cannot see all the routing. Your Mixpanel history for the removed names stops growing.
4. **Creating a project may be recorded twice** (`Project Made` from the website and `project_created` from the server). How sure I am: medium. Suggestion: keep the server one. If I am wrong: you lose the project name that only the website version sends.
5. **Clicking into the name and email boxes is recorded** (`Name Field Focused`, `Email Field Focused`, `register_button_clicked`). How sure I am: medium. They describe clicks, not outcomes, and signup completion already proves the button was pressed. Suggestion: remove them. If I am wrong: you lose a rough view of where people leave the form.
6. **Automatic click tracking is on, and it may overlap with the manual click events.** How sure I am: medium. Suggestion: decide whether you want automatic tracking. If yes, remove the manual click events.
7. **Page views may be recorded twice** (the built-in one and a per-page event from the router). How sure I am: medium. Suggestion: keep the built-in one.
8. **The same idea has two names** (`planType` and `plan`). Suggestion: call it `plan` everywhere. Changing it splits that detail's history on the events involved.

## Step 4: Setup problems (the plumbing under the events)
For each, here is my recommended answer.
9. **Your website identifies people by email, but your server uses the database ID.** So one person looks like two, and funnels across both break. Recommended fix: identify people by the database ID and keep the email as a profile detail.
10. **Nothing tells Mixpanel when someone logs out.** The next person on a shared computer inherits the previous person's activity. Recommended fix: reset at logout.
11. **Segment and Mixpanel both record events.** Recommended: choose one as the main tool, so nothing is counted twice. I have not touched Segment.
12. **No Mixpanel region is set anywhere.** If your project is in the EU or India, events are accepted and never appear in your project. I need your answer. I will not guess.

## Step 5: Things I could not work out
- One event name is built from a variable (`${page}_viewed`), so I cannot list the real names it creates. Suggestion: one `page_viewed` event with the page as a detail.
- A shared helper (`trackEvent`) records most website events. I found all its callers and they are covered above.

## What this check cannot see
Other projects and services, code that only runs in some cases, and what actually arrives in Mixpanel. I cannot tell you an event is unused or not arriving.

## Step 6: What changes in your Mixpanel history
Removing or renaming events does not delete their old data. It stays in Mixpanel but stops growing. Merging three signup names into one does not merge the past. Charts will show the old ones ending and the server one continuing. Two options: switch on a set date, or record both for a while.

## Step 7: For you to check in Mixpanel (I cannot do this)
- After the cleanup, you may want to hide the old signup, test and click events, or ask a project owner to merge duplicates. Mixpanel cannot delete events.
- Check whether some people have profiles keyed by email that need merging.

## Your decisions
Questions:
- Q1 (blocking): Which Mixpanel region is your project in: US, EU or India?
- Q2 (blocking for item 11): Which is your main tool, Segment or Mixpanel?
- Q3 (I will assume yes, because a missing region is a common sign of EU visitors, unless you say otherwise): Do you have EU, UK or California visitors who must agree to tracking first?
- Q4 (I will assume no unless you say otherwise): Do you want automatic click and page tracking?

How to reply:
- "Approve everything under Safe to fix now."
- "Approve 1 and 2, and 9 and 10. Skip the rest."
- "Go with your assumptions."
I will change only what you approve.

What I will change:
- I will edit, depending on what you approve: the header, billing, signup, legacy signup, projects, form, router, login and logout files, and the analytics setup.
- I will create: a tracking plan file (`docs/tracking-plan.md`) and a short note (`AGENTS.md`) so future AI tools follow the same rules.
- I will not touch anything else, including the Segment files.

## Technical details (for your developer)
Full list of tracking calls:
| Event | Details sent | File:line | Notes |
|---|---|---|---|
| Signup Completed | plan | web/src/signup/Done.tsx:5 | browser |
| signup_completed | distinct_id, method | api/routes/auth.ts:6 | server |
| signupCompleted | none | web/src/legacy/Register.tsx:5 | fires on render |
| Project Made | projectName (free text) | web/src/projects/New.tsx:6 | browser |
| project_created | distinct_id | api/routes/projects.ts:6 | server |
| plan_upgraded | distinct_id, planType, plan_price ("49.99") | api/webhooks/billing.ts:5 | server |
| debug_click, test_event | none | web/src/Header.tsx:7,8 | remove |
| Name Field Focused, Email Field Focused, register_button_clicked | none | web/src/signup/Form.tsx:6-8 | noise |
| `${page}_viewed` | none | web/src/router/track.ts:4 | dynamic name |
| identify(email), people.set | email | web/src/auth/login.ts:4-5 | see 9 |
````

## What the follow-up looks like after you answer

````
Thanks. I have not changed any code yet. Here is what your answers change, using the same numbers as before.

## What changed in my recommendations
- Item 12 (region): your project is in the EU, so the missing setting means no data arrives from either the website or the server. This is now the most urgent fix.
- Item 6 (automatic tracking): you do not want it, so I recommend turning it off. With it off, the hand-written page view becomes your only page tracking, so item 7 now recommends replacing it with one `page_viewed` event with a page detail.
- Item 11 (Segment): set aside as you asked. I will leave the Segment files alone.

## Now safe to fix
- Item 12, the EU setting, is now certain, has no downside and needs no choice from you. I moved it to "Safe to fix now" and marked it urgent.

## What is unchanged
Items 1 to 5, 8, 9 and 10.

## Your decisions
Questions still open:
- Q3 (I will assume consent is needed, since your project is in the EU): do you have visitors who must agree first?

How to reply:
- "Approve everything under Safe to fix now" (this now covers items 1, 2 and 12).
- "Approve 1, 2, 12, 9 and 10. Skip the rest."
I will not change any code until you reply.
````
