# Thinking checklist

Use this before you propose or change anything. Answer in writing, briefly, and know the file and line for every claim about the code. If you cannot point to it, you have not looked yet. Show file and line in the technical details of your reply, and keep the main text in plain English.

Do not write or edit tracking code until the checklist for your mode is complete and the user has approved the proposal.

## 1. Look at the code first (all modes)

Report what you found, with file and line:
- Stack and framework, and the analytics SDK if any.
- Where Mixpanel is initialised: token source, region or host, autocapture and page view settings, any wrapper or helper.
- Any other analytics or CDP in the project (Segment, RudderStack, GTM, GA, Amplitude, PostHog). If a CDP exists, stop and ask the user before adding a second pipeline.
- The naming style in use, and any tracking plan file or `AGENTS.md`.
- Identity: where `identify` and `reset` are called, and what ID is used.
- Super properties registered.
- Existing events near the area you are working on.

## 2. Questions only the user can answer

Ask at most five, and only what the code cannot answer. Do not guess business goals. Label each question either **blocking** (you cannot continue well without it) or **assumed** ("I will assume X unless you say otherwise"), so the user can reply "go with your assumptions".
- What is the main goal or "value moment" of this product or feature?
- Are any users in the EU, UK or California (does tracking need consent first)? If there are signs they are (an EU region, a country list, a cookie banner), assume consent is needed and say so.
- Which Mixpanel data region does the project use (US, EU, India)? Always blocking. Never assume it, because a wrong region fails silently.
- On web, is autocapture wanted, or manual events only?
- Which part of the product is "old" and which is "new" (revamp mode only)?

If the project already answers one of these (for example the region is set in the init code, or a page has no skip button), state what you found instead of asking. Never ask a question you can answer by reading the code.

## 3. Feature thinking (new feature, revamp, first-time setup)

For each feature or flow:
- What is it for, and what decision will the data drive?
- What questions must the data answer? (See `minimum-sufficient-set.md`.)
- What are its start, success, failure and abandon moments?
- Is each moment already tracked? If so, reuse it. Cite the existing event.
- Can it be a property on an existing event instead of a new event?
- Does each candidate pass the decision, implied, difference and removal tests?
- Is anything on the list noise (field interactions, hovers, scrolls, every-click)?
- Client-side or server-side? Payments and account changes belong on the server.
- Is the user identified at the moment it fires? If not, what ID will it carry?
- Would any property contain personal data (email, phone, name, free text)?
- Could it fire twice (re-render, effect, retry, both client and server)?
- Can one real-world action repeat (a button that creates a new link every click)? What counts as one occurrence?
- Is it recorded after the last step that can still fail? If earlier, why?

## 4. Cleanup thinking (audit mode)

- Did you find every call, including calls through wrappers and helpers?
- For each finding, is it certain or a judgment? Certain means the code alone proves it with no assumptions (the same words spelled two ways, an event named test or debug, an exact duplicate call, a number sent as text). Anything that depends on routing, what runs when, intent or Mixpanel itself is a judgment. If unsure, it is a judgment. Label it and say how sure you are.
- Which events have dynamic names you cannot resolve? List them, do not guess.
- What can static analysis not see? (Other repos, other services, code behind flags, runtime behaviour.) State it.
- Never say an event is "unused" or "not firing" in Mixpanel. You only see code.

## 5. Troubleshooting thinking

- Read the init code and config before suggesting causes.
- Rank the likely causes with evidence from the code.
- Say how the user can confirm each cause in Mixpanel's live view.

## 6. Before you present a proposal

- [ ] Every claim about the code cites file and line.
- [ ] Questions to the user were limited to what code cannot answer, and each is labelled blocking or assumed.
- [ ] The reply follows the layout in `spec-template.md`: short version first, plain English, items numbered once from 1, technical details last.
- [ ] Every file you will edit or create is listed, including the tracking plan and any helper file.
- [ ] Identity and consent are shown as separate, optional decisions.
- [ ] Every event has: what it tracks, why, where it fires, and its properties.
- [ ] Every event passed the four tests.
- [ ] Rejected candidates are listed with reasons.
- [ ] Names follow the project's style, or the default if none.
- [ ] Nothing duplicates an existing event, autocapture, or a default property.
- [ ] Identity, consent and personal data were considered.
- [ ] You are about to stop and ask for approval, not to write code.

## 7. After approval

- Implement only approved items, in the project's own pattern.
- Do not touch unrelated files.
- Confirm each approved event fires exactly once.
- Run the type-check or tests the project already has.
- Update the tracking plan file.
- Tell the user how to check the events in Mixpanel's live view.
