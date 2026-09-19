# Example: first-time setup

Fictional product: "Taskly", a team to-do app. A React website and a Node server, no analytics yet. This is what the AI shows before it changes any code. Notice: short version first, plain English, one running number, technical details last.

````
MODE: first-time setup. Tell me if you want a different mode.

## The short version
- What I looked at: how people sign up, create projects, add tasks and pay.
- What I recommend: 4 events that let you see how many visitors sign up, whether they start using the product, and who pays.
- I have not changed anything yet.
- I need 3 decisions from you. They are at the end.

## Step 1: What I found in your product
- People sign up with an email and password, then create projects and add tasks.
- Payments are confirmed by your payment provider calling your server.
- There is no analytics of any kind yet, and no other tracking tool.
- There is no way to tell a "completed task" from any other edit, so I cannot record completions yet.

## Step 2: What you want to learn
Everything below is built to answer these questions. I assumed the first one from your product description, so please check it.
1. How many visitors sign up, and by which method?
2. Do new users start using the product (first project, then first task)?
3. Do people keep adding tasks after the first day?
4. Who upgrades to a paid plan, and to which plan?

## Step 3: The events I recommend
Because of those questions, these are the four moments worth recording. All four are recorded by your server, so browser ad blockers cannot hide them.

### 1. Someone signs up   (event name: `user_signed_up`)
- What it tells you: how many accounts are created, and by which method.
- Why it matters: it is the top of your funnel.
- When it is recorded: right after the account is created.
- Details recorded with it: the signup method (email or Google).

### 2. Someone creates a project   (event name: `project_created`)
- What it tells you: how many people take the first step of using the product.
- Why it matters: together with the next event it shows who activates and how long it takes.
- When it is recorded: when a project is created.
- Details recorded with it: none needed yet.

### 3. Someone adds a task   (event name: `task_created`)
- What it tells you: real day-to-day use, and whether people come back.
- Why it matters: repeat adds over time are your retention signal, so no separate "retention" event is needed.
- When it is recorded: when a task is added.
- Details recorded with it: none. Task titles are free text and may contain personal information, so I leave them out.

### 4. Someone starts a paid plan   (event name: `subscription_started`)
- What it tells you: who pays, and on which plan and billing period.
- Why it matters: it is your revenue conversion.
- When it is recorded: when your payment provider confirms the subscription.
- Details recorded with it: the plan, and monthly or yearly.

## Step 4: What I decided not to record, and why
- Every click and page view: noise. Nothing you want to learn depends on them.
- Typing or clicking in the signup form: no decision depends on it.
- A task being completed, edited or deleted: I cannot yet tell them apart, and none answers your four questions. We can add this later.
- Logging in or out: it adds nothing beyond the events above.
- A failed signup: low value for now.

## Step 5: Optional, separate decisions
Approving the events above does not approve these. Each one is your call.
- **Waiting for consent:** if you have visitors in the EU, UK or California, tracking may need their permission first. I recommend waiting for consent if you have such users. This is engineering guidance, not legal advice.
- **Linking events to a known person in the browser:** not needed while all four events come from your server. It matters only if you later add browser events.
- **One shared helper for recording events:** I recommend one small file so names and the user ID are set in one place. It is optional.

## Step 6: What will change in your project
- I will edit: the signup, projects, tasks and billing files on your server, and the package list (to add the Mixpanel library).
- I will create: one helper file for recording events, and a tracking plan file (`docs/tracking-plan.md`) that lists every event and why it exists.
- I will not touch: anything else.

## Your decisions
Questions:
- Q1 (blocking): Is "people create a project and add tasks in their first week" your main goal?
- Q2 (blocking): Which Mixpanel region is your project in: US, EU or India? A wrong choice means no data arrives.
- Q3 (I will assume no unless you say otherwise): Do you want automatic page and click tracking on the website? I recommend not, to keep the data small.

How to reply:
- "Approve all" or "Approve 1, 2 and 3, skip 4".
- "Go with your assumptions."
I will not change any code until you reply.

## Technical details (for your developer)
| # | Event | Where it is recorded | Side | Details and types | Tests passed |
|---|---|---|---|---|---|
| 1 | user_signed_up | api/routes/auth.ts:22, after create | server | signup_method (string) | decision, implied, difference, removal |
| 2 | project_created | api/routes/projects.ts:8 | server | none | all four |
| 3 | task_created | api/routes/tasks.ts:8 | server | none | all four |
| 4 | subscription_started | api/webhooks/billing.ts:10 | server | plan (string), billing_period (string) | all four |
Notes: payment providers retry webhooks, so `subscription_started` can arrive twice. If the payload has an event ID, use it as `$insert_id`. Events use the database user ID as the person ID, never the email. Names follow the default style: snake_case, Object Verb, past tense.
````
