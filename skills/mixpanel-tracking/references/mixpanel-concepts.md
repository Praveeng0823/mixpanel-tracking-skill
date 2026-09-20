# Mixpanel concepts and rules

Each rule is tagged:
- **[Mixpanel]**: stated in Mixpanel's docs. The source page is listed in `sources.md`.
- **[Ours]**: our own recommendation. Mixpanel does not say this. The reason is given.

Check date: 2026-09-19. Wording is paraphrased. Recheck limits and hostnames before release.

## 1. Data model
- **[Mixpanel]** An event is an action in the product, with properties that describe it. Once tracked, events and their properties cannot be changed.
- **[Mixpanel]** A user profile holds the user's current state, joined to events by the user's ID. A group profile does the same for a group such as a company.
- **[Mixpanel]** Event properties capture the context at the time of the action. Profile properties show the current state. Use profile properties mainly for things like name, email and domain. Most other information belongs on events, so changes over time are kept.
- **[Ours]** Decision rule for the AI: if the value describes the moment of the action (plan at time of purchase, step number), it is an event property. If it describes who the user is now (current plan for segmentation), it is a profile property. If it should appear on nearly every event, it is a super property.

## 2. Event naming
- **[Mixpanel]** Names are case-sensitive. `sign_up_completed` and `Sign_Up_Completed` are two different events.
- **[Mixpanel]** Recommended format is Object Verb, for example `song_played` or `page_viewed`.
- **[Mixpanel]** snake_case is described as generally more robust for event and property names.
- **[Mixpanel]** Do not put changing values in the name, for example `Purchase (11-01-2019)`. Use one `Purchase` event and put the value in a property.
- **[Mixpanel]** Data Standards (Enterprise only) can enforce a naming convention, but Mixpanel does not prescribe which one.
- **Default for this skill:** if the project has no convention, use snake_case, Object Verb (for example `signup_completed`). **[Ours]**, based on the two Mixpanel recommendations above.
- **[Ours]** If the project already has a convention, follow it, even if it differs from the default. Consistency matters more than the choice. Mixed styles in one project are a cleanup finding.
- **[Ours]** Name events after the user's action or the outcome, never the button text or the component name.

## 3. Page and step tracking
- **[Mixpanel]** Track different pages as an event property, not as different events, for better analysis (stated in the server-side guidance).
- **[Ours]** So the default for a multi-step flow is one event, such as `onboarding_step_viewed`, with properties `step_name` and `step_number`, and one for completion. Funnels can still be built step by step by filtering on the property.
- **[Ours]** If the project already uses one event per page, follow the project's pattern and do not mix both styles.
- **[Ours]** This skill follows Mixpanel's guidance: one event with a step property is the default, not one event per page.

## 4. What to track (the minimal principle)
- **[Mixpanel]** Tracking everything a user can do leads to unnecessary development effort and unused data. Prioritise the data that matches the KPIs and analytics strategy, then iterate.
- **[Mixpanel]** Map each KPI to the user actions behind it, including the different paths to the same outcome, then break the flows into events (actions) and properties (context).
- **[Mixpanel]** Be explicit about what is tracked instead of tracking everything implicitly. Avoid user-generated content, high-cardinality IDs and large semi-structured objects.
- **[Ours]** The four tests (decision, implied, difference, removal), the rule against field-level interaction events, and the rejected-candidates list are our method for applying the principle above. See `minimum-sufficient-set.md`.
- **[Mixpanel]** The tracking plan should be a centralised, living source of truth shared across teams. **[Ours]** This is why every mode writes the tracking plan file.

## 5. Properties and types
- **[Mixpanel]** Supported types: string, number, boolean, date, list, and limited support for objects and lists of objects.
- **[Mixpanel]** Numbers sent as strings are stored as strings. They are not converted, so numeric analysis fails.
- **[Mixpanel]** Dates should be ISO format in UTC. A Unix timestamp is treated as a number.
- **[Mixpanel]** Booleans should be real `true` or `false`, not strings.
- **[Mixpanel]** Missing, null and empty-string values show up differently in reports (`(not set)`, `(empty string)`). Send a real value or omit the property.
- **[Mixpanel]** Do not name a property `bucket` or `$bucket`. It is hidden and can make other events disappear from reports.
- **[Mixpanel]** Do not recreate default properties that the SDK sets (browser, OS, current URL, referrer, screen size, library version, UTM parameters, device and user IDs).
- **[Mixpanel]** Properties starting with `$` have special handling. Reserved examples: `$distinct_id`, `$time`, `$insert_id`, `$ignore`, `$email`, `$name`.
- **[Ours]** Use the same property name for the same concept across all events (`plan`, not `plan` in one and `planType` in another). Mixed names are a cleanup finding.

## 6. Limits (to be respected, and to be flagged when exceeded in code)
- **[Mixpanel]** Up to 255 properties per event.
- **[Mixpanel]** Property names and string values: 255 characters (strings are described as 255 bytes on the data-type page). Longer values are truncated.
- **[Mixpanel]** Soft limit of 5000 distinct event names and 5000 distinct event properties per project. Above that, data is still ingested but the names are not indexed.
- **[Mixpanel]** Lists and objects: 8 KB as an event property. Objects nest at most 3 levels.
- **[Mixpanel]** A user profile holds up to 2000 properties.
- **[Mixpanel]** Hot-shard throttling: above 200,000 events per user ID per day (1,000,000 per group ID per day), events are rewritten to `$hotshard_events` and lose their user ID. It is usually caused by a static placeholder ID or a bug in identity handling.
- **[Mixpanel]** Send events that truly belong to no user with an empty ID, not an arbitrary placeholder string.
- **[Ours]** Dynamic event names built from IDs or dates can grow toward the 5000 limit, so flag them in audits.

## 7. Identity
- **[Mixpanel]** Simplified ID Merge is the default for organisations created from April 2024. The identity mode cannot be changed once a project has data.
- **[Mixpanel]** Events with the same distinct ID are treated as one person. For identified users the distinct ID is the `$user_id`. Before login, events carry a device ID.
- **[Mixpanel]** Call `identify` at login or signup only for identified users, never for anonymous visitors.
- **[Mixpanel]** Send at least one event after `identify` so the device and the user are linked.
- **[Mixpanel]** Use a stable database ID as the user ID, not an email or anything that can change. A user ID cannot be changed or merged with another.
- **[Mixpanel]** Call `reset` at logout so a shared device does not attribute a new person's events to the previous one.
- **[Mixpanel]** Do not create profiles for anonymous users before they are identified. Hold profile updates until login.
- **[Mixpanel]** Server-side SDKs do not create IDs. Your server generates and persists the user ID and sends it on every event.
- **[Mixpanel]** If a CDP such as Segment, RudderStack or mParticle is in use, its configuration must match the project's identity mode.

## 8. Autocapture, page views and clicks
- **[Mixpanel]** Autocapture records page views, scrolls, form interactions, clicks and changes, attribution, dead clicks and rage clicks. Its events use a `$mp_` prefix and show as "[Auto] ..." in reports.
- **[Mixpanel]** Autocapture skips sensitive elements by default (text inputs, selects, textareas, password fields).
- **[Mixpanel]** With autocapture on, you do not need extra page view tracking, except in a single-page application.
- **[Mixpanel]** The default page view event name in the web SDK is `$mp_web_page_view`.
- **[Ours]** If autocapture is on, do not hand-write events that duplicate its page views or generic clicks. Add manual events only for meaningful moments it cannot know, such as a completed signup or a payment.
- **[Ours]** Needs verification before release: the default value of `track_pageview` in the current web SDK, and how it interacts with autocapture in single-page apps.

## 9. Server-side vs client-side
- **[Mixpanel]** Client-side tracking can lose 30 to 50 percent of events to ad blockers and Do Not Track. Routing through a proxy on your own domain reduces this.
- **[Ours]** Events that matter for money or accuracy (payments, subscription changes, account creation) should fire on the server, where they cannot be blocked. Interface events (page views, step views) fire on the client.
- **[Mixpanel]** Server-side, the IP you send is your server's, so geolocation is wrong unless you pass the client's IP. For profile updates via server, set the IP to `0` so the location is not overwritten.
- **[Mixpanel]** Server-side SDKs must be told to wait for the request in short-lived or serverless functions, or the event may never send.
- **[Mixpanel]** The track endpoint only accepts events from the last 5 days. Older events must use the import path.
- **[Mixpanel]** Mobile SDKs queue events and send about every 60 seconds by default.

## 10. Environments and test data
- **[Mixpanel]** Use a separate project for development, switching the token by environment. Billing counts users once per project, so test users in several projects count several times.
- **[Mixpanel]** Test and internal traffic can be excluded by setting `$ignore` to `true` (or a non-empty string) on the event. The JS SDK filters common bots by default.
- **[Ours]** Test, debug and `console.log`-style events found in production code are a cleanup finding.

## 11. Privacy and consent
- **[Mixpanel]** Customers control what is sent and can stop sending personal data at any time.
- **[Mixpanel]** SDKs support opting a user out, after which no data is sent for that user. A client-side opt-out does not affect server-side events, which must be handled manually.
- **[Mixpanel]** Options: hash a unique ID and use the hash as the user ID, turn off IP geolocation, and use the property blacklist to stop default properties being set.
- **[Ours]** Do not put emails, phone numbers, names, free text typed by users or addresses in event properties unless the user says it is needed. Where users may be in regulated regions, tracking should start only after consent. This is engineering guidance, not legal advice.

## 12. Data residency
- **[Mixpanel]** EU projects must send data to `api-eu.mixpanel.com`. Data sent to the default US host does not reach an EU project. Node uses a `host` option, Python a consumer `api_host`, and the web SDK `api_host`. India uses `api-in.mixpanel.com` in the Node SDK docs.
- **[Ours]** A wrong host or token is the first thing the troubleshooting mode checks, because it fails silently. Recheck the current hostnames and any forwarding changes on the residency pages before release.

## 13. Groups
- **[Mixpanel]** Groups (companies, accounts) are for analysis at the account level, mainly for B2B. It is an add-on for Enterprise and Growth plans.
- **[Ours]** If the product is B2B and the code already calls group methods, follow that pattern. Otherwise mention groups as an option and do not add them by default.

## 14. Debugging (feeds Mode 5)
Mixpanel lists these common reasons events do not appear:
- SDK not initialised, or no event sent yet.
- Wrong regional host.
- The event or property was hidden in Lexicon by an admin.
- Report menus hide events not seen in the last 30 days.
- New properties may take time to appear in dropdowns.
- Ad blockers or Do Not Track.
- Mobile flush interval.
- Also check that the token matches the project, that event name casing matches, and that data types are what you expect.

## 15. What happens to existing data when code changes (background only)
- **[Mixpanel]** Events cannot be deleted or renamed in Mixpanel. Hiding is reversible. Blocking stops future data and the data cannot be recovered. Merging combines duplicate events without changing raw data and only project owners can do it. Autocapture events cannot be merged.
- **[Ours]** Renaming an event in code therefore creates a new event and splits history. The skill warns before any rename and never acts inside Mixpanel. It can hand the user a checklist of events they may want to review in Mixpanel's UI.

## Known gaps
- Mobile SDK behaviour (React Native, Swift, Android): best-effort in v1.
- Group implementation details and limits.
- Geolocation and attribution pages.
- SDK opt-out method names and consent patterns.
- Exact `track_pageview` default and single-page app behaviour.
- India residency hostnames.
