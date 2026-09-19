# Example: reviewing a change

Fictional pull request: adds a "share project" feature to "Taskly". Notice: plain findings, ordered by importance, one running number, and file details last.

````
MODE: review. Tell me if you want a different mode.

## The short version
- This change records 3 things for the new share feature. I found 5 things worth fixing before you merge.
- I have not changed anything.

## Step 1: What the change does to your tracking
It records when someone shares a project, when the share dialog opens, and when someone clicks into the email box or the close button. It records sharing twice, once from the website and once from the server, under two different names.

## Step 2: What to fix, most important first
1. **Sharing is recorded twice under two names** (`Project Shared` from the website and `project_shared` from the server). One share will show up as two events. Fix: keep the server one and remove the website one.
2. **Three events record clicking, not outcomes** (dialog opened, email box focused, close clicked). No decision depends on them, and the share itself is already recorded. Fix: remove all three.
3. **The website event does not match your naming style.** Your project uses snake_case, and `Project Shared` uses Title Case. This is solved by fix 1.
4. **The share event includes the recipient's email address.** It is personal information and answers no question you have. Fix: record how many people were invited instead.
5. **The tracking plan file was not updated.** It has no row for the new event, so the next person will not know it exists. Fix: add it in this change.

## Step 3: What looks good
- The server-side share event is recorded only after the share is saved.
- The types are right: the count is a number.

## Your decisions
How to reply: "Fix all", "Fix 1, 2 and 4", or "Leave it, I will handle it."

## Technical details (for your developer)
| # | Where | Notes |
|---|---|---|
| 1 | web/src/share/ShareDialog.tsx:48 and api/routes/share.ts:30 | duplicate client and server events |
| 2 | ShareDialog.tsx:22, :35, and the close button | interaction noise |
| 3 | ShareDialog.tsx:48 | Title Case in a snake_case project |
| 4 | api/routes/share.ts:32 | `recipient_email` sent as a property |
| 5 | docs/tracking-plan.md | no `project_shared` row |
````
