# Test cases and pass/fail checklists

Every case has a sample app in `fixtures/`, a prompt, scripted answers, and a checklist. Each case is run twice: once in a folder WITHOUT the skill (baseline) and once WITH it. The comparison is the proof that the skill helps.

Score each line PASS or FAIL for both runs. A good result is: the WITH run passes nearly everything and the WITHOUT run visibly fails several lines.

Prompts are written the way a normal user would talk. They never mention the skill, so we also test that it switches on by itself. If it does not, note that and retry with `/mixpanel-tracking` at the start.

## Checks that apply to every case
- [ ] Read the code before proposing, and named files.
- [ ] Explained every proposed event: what it tracks, why, where it fires, its properties.
- [ ] Listed what it decided NOT to track, with reasons.
- [ ] Stopped and waited for approval. No files were changed before approval.
- [ ] After approval, changed only what was approved.
- [ ] Never asked for a Mixpanel token or key, and never claimed to check Mixpanel.
- [ ] Did not track field focus, typing, hover or scroll.

## Case 01: first-time setup (Mode 1)
Folder: `01-no-tracking`
Prompt: `This app has no analytics yet. Set up Mixpanel tracking for it.`
Scripted answers (only if asked): main goal = "Teams create a project and add tasks in their first week." EU users = "Yes, some." Region = "EU." Autocapture = "No, manual events only." Anything else = "You decide, keep it simple."
Approval message: `Go ahead with everything you proposed as must-have. Skip anything you called nice-to-have.`
- [ ] Asked at most five questions, and only about things the code cannot tell (goal, EU users, region, autocapture).
- [ ] Proposed a small set (about 4 to 6 events) tied to signup, first project, first task, upgrade.
- [ ] Put payment and account events on the server, not the browser.
- [ ] Names in one consistent style (snake_case, Object Verb, past tense).
- [ ] No email, name or other personal data in event properties.
- [ ] Proposed identity handling (or explained why not needed) and a single wrapper.
- [ ] Raised consent because of EU users.
- [ ] Used the EU data host.
- [ ] Created a tracking plan file after approval.

## Case 02: new onboarding replaces old (Mode 3)
Folder: `02-onboarding-revamp`
Prompt: `We just built a new 4-page onboarding in web/src/onboarding that replaces the old one in web/src/onboarding-old. Set up the Mixpanel tracking for the new onboarding.`
Scripted answers: goal = "See how many people finish onboarding and where they drop off." History = "Switch on a set date."
Approval message: same as case 01.
- [ ] Read both the old and the new onboarding.
- [ ] Sorted the old events into keep, change and remove, with reasons.
- [ ] Removed or rejected field focus, typing, back, tooltip and per-button events.
- [ ] Kept "Onboarding Completed" (or its equivalent) so history continues.
- [ ] Used the project's existing name style (Title Case With Spaces), not a new style.
- [ ] Proposed ONE step-viewed event with a step property, not four separate page events.
- [ ] Proposed a submit event on the main button of each page, and explained what it adds beyond the next page view.
- [ ] Did not propose a separate "moved to next page" event.
- [ ] Warned that Mixpanel cannot delete or rename events, so old history stays.
- [ ] After approval, each new event fires once per page (no double firing).
- [ ] Total events proposed is much smaller than the old flow (which had 13 calls).

## Case 03: messy tracking, audit and clean up (Mode 4)
Folder: `03-messy-audit`
Prompt: `Audit and clean up our Mixpanel tracking.`
Approval message: `Go ahead with the certain findings only. Do not touch anything you marked as a judgment call.`
Planted problems the audit should find:
- [ ] Same action under three names: Signup Completed, signup_completed, signupCompleted.
- [ ] Test events: test_event, debug_click.
- [ ] Field focus noise in the signup form.
- [ ] identify uses the email instead of a stable ID.
- [ ] No reset when logging out.
- [ ] plan_price sent as a string, and planType vs plan for the same idea.
- [ ] Segment and direct Mixpanel both present.
- [ ] A dynamic event name in web/src/router/track.ts, flagged as impossible to resolve (not guessed).
- [ ] Traced the trackEvent wrapper.
- [ ] Project Made and project_created flagged as a likely duplicate, labelled a judgment call.
- [ ] The old Register page flagged as likely dead, labelled a judgment call, not certain.
- [ ] Autocapture plus page view tracking noted as possible overlap.
Behaviour:
- [ ] Separated certain findings from judgment calls.
- [ ] Stated what it cannot see, and never said an event is "unused" or "not firing".
- [ ] Warned that renaming splits history in Mixpanel.
- [ ] Gave a checklist for the user to review inside Mixpanel, without acting there.
- [ ] After approval, changed only the certain findings.

## Case 04: new feature, tracking exists (Mode 2)
Folder: `04-new-feature`
Prompt: `We just built a share project feature (web/src/share and api/routes/share.ts). Set up Mixpanel tracking for it.`
Scripted answers: goal = "Know how many people share projects and whether sharing brings in new users."
- [ ] Read docs/tracking-plan.md and the existing wrapper.
- [ ] Considered reusing invite_sent, and explained the choice either way.
- [ ] Used the existing server wrapper (track in api/lib-analytics.ts).
- [ ] Put the main event on the server.
- [ ] Same naming style as the plan (snake_case, Object Verb).
- [ ] Rejected dialog opened, field focus and close clicks.
- [ ] Kept email addresses out of properties.
- [ ] Updated docs/tracking-plan.md after approval.

## Case 05: events not showing up (Mode 5)
Folder: `05-not-showing-up`
Prompt: `Mixpanel shows almost no events from production and some look wrong. Figure out why.`
Approval message: `Fix the ones you are most sure about.`
- [ ] Found: the browser SDK has no EU host, although the project is in the EU (README, .env.example).
- [ ] Found: the server SDK also has no EU host.
- [ ] Found: the serverless handler can end before the event is sent.
- [ ] Found: the page viewed effect has no dependency list, so it fires again and again.
- [ ] Found: autocapture and page view tracking are on, plus a manual page view event (duplicates).
- [ ] Found: no reset at logout.
- [ ] Ranked causes with file and line evidence.
- [ ] Told the user how to confirm each cause in Mixpanel's live view.
- [ ] Did not change code before approval.

## Case 06: review a pull request (Mode 6)
Folder: `06-pr-review`
Prompt: `Review the tracking in change.diff before we merge it.`
- [ ] Caught that project sharing is tracked twice (browser and server) with two different names.
- [ ] Caught the noise: dialog opened, email field focused, close clicked.
- [ ] Caught the naming drift (Title Case events in a snake_case project).
- [ ] Caught the email address in recipient_email.
- [ ] Noticed the tracking plan was not updated.
- [ ] Changed no files.
