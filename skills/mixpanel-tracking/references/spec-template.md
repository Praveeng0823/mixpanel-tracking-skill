# Output templates

Your reader is a product manager, founder or growth lead, not necessarily an engineer. Write so they can read the top half of every reply on its own and decide, without knowing the code.

## How to write for this reader

- Plain, short sentences. Say "when someone finishes signing up", not "on the signup mutation success callback".
- Explain each event in business terms: what it tells them, why it matters, when it is recorded, which details come with it.
- Keep code words (file paths, function names, property types, SDK names) out of the main text. They go in the "Technical details" section at the end.
- If you must use a term like "identify" or "consent", explain it in one short phrase the first time.
- Number every item once, continuously, from 1 upward across the whole reply. Never restart numbering per section. The user replies with those numbers.
- Each step should lead into the next. Start a step with a short link like "Because of those questions, here are the moments worth recording." Never present a step as if the previous one did not exist.
- Put the short version first, the decisions last, and the technical details after that.
- Use exact names for events in code font (for example `signup_completed`) but always next to a plain description.

## Questions to the user

At most five, and only what the code cannot tell you. Label each one:
- **Blocking:** I cannot continue well without an answer.
- **I will assume ... unless you say otherwise:** state the assumption, so the user can reply "go with your assumptions".

Never ask what the code already answers (for example whether a page has a skip button). State what you found instead.

Two questions are special:
- **Data region (US, EU or India) is always blocking.** Never assume it. A wrong region fails silently: events are accepted and never appear. If the project's own files state the region (a tracking plan, config or environment file), say what you found and ask the user to confirm it.
- **Consent:** if there is any sign of EU, UK or California users (an EU region, a country list, a cookie banner), assume the cautious answer, that consent is needed, and say so. Never default to "no consent handling" when the signs point the other way.

## How the user replies

Always end with the reply options, using the item numbers. For example:
- "Approve all" or "Approve 1, 2 and 4, skip 3".
- "Approve everything under Safe to fix now."
- "Go with your assumptions."

You change nothing until they reply.

If a decision item has options, give one **My recommended option** line, so a vague reply like "fix all" has a clear meaning. When the reply is vague ("fix the ones you are sure about", "fix all", "do what you think"), restate the exact item numbers you will apply, use your recommended option for any item with options, and apply nothing else.

---

## A. Proposal (first-time setup, new feature, revamp)

```
MODE: <first-time setup | new feature | revamp>. Tell me if you want a different mode.

## The short version
- What I looked at: <one plain sentence>
- What I recommend: <N> events that let you see <what, in one plain sentence>.
- I have not changed anything yet.
- I need <n> decisions from you. They are at the end.

## Step 1: What I found in your product
<3 to 6 plain bullets. What the flow or product does, what tracking already exists,
anything surprising. No file names here.>

## Step 2: What you want to learn
Everything below is built to answer these questions:
1. <question in plain words>
2. <question>
(Say which ones you told me and which I assumed.)

## Step 3: The events I recommend
Because of those questions, these are the moments worth recording.

### 1. <Plain name of the moment>   (event name: `snake_case_name`)
- What it tells you: <the question it answers>
- Why it matters: <the decision it helps with>
- When it is recorded: <the moment, in plain words>
- Details recorded with it: <plain list, for example "which plan was chosen">

### 2. ...

(Revamp only: split Step 3 into "Keep", "Change", "Remove" and "Add", with one running number
across all four, and a one-line reason for each.)

## Step 4: What I decided not to record, and why
- <thing>: <plain reason>

## Step 5: Optional, separate decisions
Approving the events above does not approve these. Each one is your call.
- <for example: linking events to a known user>: what it is, why it matters, my recommendation.
- <for example: waiting for consent before tracking EU visitors>: ...

## Step 6: What will change in your project
- I will edit: <files in plain words, with paths>
- I will create: <every new file, including the tracking plan file and the short AGENTS.md note that helps future AI tools follow these rules>
- I will not touch: everything else.

## Your decisions
Questions:
- Q1 (blocking): ...
- Q2 (I will assume <X> unless you say otherwise): ...

How to reply:
- "Approve all" or "Approve 1, 2 and 3, skip 4".
- "Go with your assumptions."
I will not change any code until you reply.

## Technical details (for your developer)
| # | Event | Where it is recorded (file:line) | Browser or server | Details and types | Tests passed |
|---|---|---|---|---|---|
Notes: <anything a developer needs, such as timing, retries, redirects, double-firing guards>
```

Before you show a proposal, check: the short version is at the top, items are numbered once, no code words appear above the technical details, every file you will touch is listed, questions are labelled, and reply options are given.

---

## B. Audit report (cleanup mode)

```
MODE: cleanup. Tell me if you want a different mode.

## The short version
- I checked: <N> tracking calls in <M> files.
- Safe to fix now: <n> things. Needs your decision: <n> things. Only you can check in Mixpanel: <n> things.
- I have not changed anything yet.
- My advice: start with "Safe to fix now". It is low risk.

## Step 1: What your tracking looks like today
<4 to 6 plain bullets: naming style, how many events, what is mixed up, what is missing.>

## Step 2: Safe to fix now
These are clear from the code alone, so I am sure about them.
1. <finding in plain words>. Why it matters: <...>. Fix: <...>.
2. ...

## Step 3: Needs your decision
These depend on things I cannot see, or on what you intend. I explain my reasoning and how sure I am.
3. <finding>. Why I think so: <...>. How sure I am: <high | medium | low>. My suggestion: <...>. If I am wrong: <what breaks>.
4. ...

## Step 4: Setup problems (the plumbing under the events)
For each, I give my recommended answer so you can say yes quickly.
5. <problem in plain words>. Why it matters: <...>. Recommended fix: <...>.
6. ...

## Step 5: Things I could not work out
- <item>: why I could not tell, and what I need from you.

## What this check cannot see
<Other projects, services, code that only runs in some cases, and what people actually do in Mixpanel. I cannot tell you an event is unused or not arriving.>

## Step 6: What changes in your Mixpanel history
<Plain explanation: old events keep their history but stop growing. Mixpanel cannot delete or rename events.
Options: switch on a set date, or record both for a while.>

## Step 7: For you to check in Mixpanel (I cannot do this)
- <old or duplicate events you may want to review, hide or merge>

## Your decisions
How to reply:
- "Approve everything under Safe to fix now."
- "Approve 1, 2 and 5, skip the rest."
I will change only what you approve, and I will create or update the tracking plan file.

## Technical details (for your developer)
Full list of tracking calls:
| Event | Details sent | File:line | Notes |
|---|---|---|---|
```

Rules for "Safe to fix now": an item belongs here only when all three are true:
1. The code alone proves the problem, with no assumptions.
2. The fix has no downside and needs no choice from the user. It does not change what appears in Mixpanel history for events people rely on, and there is no "which one to keep" question.
3. It cannot break anything you cannot see.
Typical examples: events named test or debug, and a number sent as text.
Everything else goes in "Needs your decision", even when you are sure the problem is real. Examples: the same action recorded under three names (you must pick which to keep, and history changes), renaming a detail, removing a duplicate. If you are not sure, it goes in "Needs your decision".

---

## C. Troubleshooting report

Plain English throughout, in the same layout as the other modes. No file names, setting names or code terms above the technical details. Causes and fixes share one running numbered list.

```
MODE: troubleshoot. Tell me if you want a different mode.

## The short version
- The problem you described: <...>
- The most likely cause: <one plain sentence>. I am <how sure> sure.
- I have not changed anything yet.

## Step 1: What I checked
<plain bullets, including what looked fine.>

## Step 2: The likely causes, most likely first
1. <cause in plain words>. Why I think so: <evidence>. How you can confirm it in Mixpanel: <step>.
2. ...

## Step 3: What I recommend
3. <fix in plain words>. What it changes: <...>.

## Your decisions
How to reply: "Approve 3", or "Confirm cause 1 first, then fix it."

## Technical details (for your developer)
<file:line for each cause and fix.>
```

---

## D. Change review (PR or diff)

```
MODE: review. Tell me if you want a different mode.

## The short version
- This change records <what>. I found <n> things worth fixing before merging.
- I have not changed anything.

## Step 1: What the change does to your tracking
<one plain paragraph.>

## Step 2: What to fix, most important first
1. <problem in plain words>. Why it matters: <...>. Suggested fix: <...>.
2. ...

## Step 3: What looks good
- <...>

## Your decisions
How to reply: "Fix 1 and 2", or "Leave it, I will handle it."

## Technical details (for your developer)
<file:line for each finding.>
```

---

## E2. Follow-up after the user answers your questions

When the user answers, do not repeat the whole report. Send a short follow-up:

```
Thanks. I have not changed any code yet. Here is what your answers change, using the same numbers as before.

## What changed in my recommendations
- Item <n>: <what changed and why>.
- New item <n+1>: <if an answer created a new fix>.

## Now safe to fix
<Any item that your answer turned from a decision into something certain, moved here and marked as such.
If your answer made something urgent, say so. Example: "Region is EU, so the missing setting means no data arrives.">

## What is unchanged
<item numbers>

## Your decisions
Questions still open: ...
How to reply:
- "Approve everything under Safe to fix now" (list the item numbers this now includes).
- "Approve 1, 2 and 5, skip the rest."
I will not change any code until you reply.
```

Rule: after the user answers, re-sort. An item that the answers made certain and free of downsides moves into "Safe to fix now", so the quick reply covers it.

---

## E. After implementation

```
## Done
Here is what I changed, in the order you approved it:
1. <plain sentence per approved item, marked done>
2. ...

## Files I changed
- Edited: <...>
- Created: <...> (tracking plan, developer notes)

## What I checked, honestly
- <what I ran, or "I could not run the type-check because ...">
- <anything not confirmed, for example a library option I did not verify>

## How to check it yourself in Mixpanel
Give plain steps in order. For each check say what a pass looks like, and what to do if it fails.
1. <where to look, for example the browser's network tab or Mixpanel's live view>.
   - Pass: <what you should see>.
   - Fail: <what you see instead, and what it most likely means>.
2. <the next check>.
   - Pass: ...
   - Fail: ...
3. What will still look off, because it was not part of this change.
Do not name a specific default Mixpanel web address unless it is in the reference files. Say "an address without 'eu' in it" instead.
If a check fails, tell me which step and what you saw, and I will run the troubleshooting checks.

## Still open (your decisions)
- <deferred items>
```
