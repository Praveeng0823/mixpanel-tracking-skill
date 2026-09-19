# Troubleshooting: "my events are missing, wrong or duplicated"

Use this in Mode 5. Read the code first. Rank causes by evidence, not by the order below. Sources are in `mixpanel-concepts.md` and `sources.md`. Items marked **[Ours]** are engineering judgment, not Mixpanel statements.

You cannot see Mixpanel. For every cause, tell the user how to confirm it themselves: Mixpanel's live view (search by user ID), the SDK's debug mode, or the browser's network tab (look for the request when the action happens).

When you tell the user how to confirm a wrong region, describe it as "requests go to an address without 'eu' in it" (or 'in' for India). Do not name a specific default US web address unless it is listed in `mixpanel-concepts.md`.

## A. Events never arrive

| Cause | What to look for in the code | How the user confirms |
|---|---|---|
| SDK never initialised, or initialised after the first `track` | The init call is missing, behind a condition that is false, or runs after events fire. Search for `mixpanel.init`, `Mixpanel.init`, `Mixpanel(` | Debug mode shows no requests. |
| Wrong project token | Token differs between environments, is read from an env var that is empty, or points at the dev project in production | Compare the token in the network request with the token in Mixpanel project settings. |
| Wrong data region or host | EU or India project but the SDK uses the default US host. Look for `api_host`, `host` or consumer `api_host` and check it matches the project's region. Mixpanel: data sent to the wrong host is not ingested. | Requests go to the US host while the project is EU. |
| Token or host mixed between dev and prod | A hostname or environment check that picks the wrong token | Events appear in the dev project only. **[Ours]** |
| Opt-out or consent blocking | `opt_out_tracking`, `opt_out_tracking_by_default`, or a consent gate that never opts in | Debug mode shows the SDK is opted out. |
| Client-side events blocked | Ad blockers and Do Not Track. Mixpanel notes client-side tracking can lose 30 to 50 percent of events. Fix option: route through a proxy on the project's own domain. | Events appear from some users and not others. |
| Event ignored on purpose | `$ignore` set to true on events, or bot or internal filtering | Events with that property never appear. |
| Old timestamp on the server | Server track calls with a time older than 5 days are not ingested by the track endpoint. Older events need the import path. | Only historical events are missing. |
| Serverless function ends early | Server SDK call not awaited, or no callback or promise wait in a short-lived function. Mixpanel says short-lived and serverless code must wait for the request to finish. | Events appear sometimes, often missing on cold or fast-ending functions. |
| Mobile events delayed | Mobile SDKs queue and send about every 60 seconds by default | Events arrive late, then all at once. |

## B. Events arrive but look wrong

| Cause | What to look for | How the user confirms |
|---|---|---|
| Name casing differs | Names are case-sensitive. `Signup Completed` and `signup_completed` are separate events | Two similar events appear in Mixpanel. |
| Properties missing or wrong type | A property is undefined at fire time, or numbers are sent as strings (stored as strings, so numeric reports fail) | Property shows as `(not set)` or cannot be summed. |
| Event or property hidden or not indexed | Admins may have hidden it. Mixpanel also hides events not seen in the last 30 days from report menus, and stops indexing names past the soft limit of 5000 | Data exists in live view but not in a report dropdown. |
| Hot-shard rewrite | A static string used as the user ID, or over 200,000 events per user ID in a day. Events are renamed `$hotshard_events` with the user ID blanked. | Events appear under `$hotshard_events`. |
| Property named `bucket` or `$bucket` | Search for it | Other events vanish from reports (Mixpanel warning). |

## C. Users look wrong (identity)

| Cause | What to look for | How the user confirms |
|---|---|---|
| `identify` called with no event after it | No `track` after `identify` in the login flow. Mixpanel: send at least one event after `identify` to link the device and the user. | Anonymous and known activity are two separate people. |
| No `reset` at logout | Logout handler does not call `reset` | Two people on one device merge into one. |
| `identify` called for anonymous visitors | `identify` with a temporary or random ID | Many one-off profiles. |
| Email or changing value as user ID | `identify(email)` | User ID cannot be changed later. Mixpanel: a user ID cannot be changed or merged. |
| Server events without a user ID | Server `track` with no distinct ID or with a placeholder | Events show under no user, or the hot-shard rewrite. |
| Profile updates before `identify` | `people.set` in code that runs for anonymous users | Profiles exist for anonymous users. |
| Client and server use different IDs | Client uses one ID, server uses another for the same person | The same person appears as two users. **[Ours]** |
| CDP and identity mode mismatch | Segment, RudderStack or mParticle configured differently from the project's identity mode | Identity looks merged wrongly. |

## D. Events are duplicated

| Cause | What to look for | How the user confirms |
|---|---|---|
| Autocapture plus manual events | `autocapture: true` (or default page view tracking) and hand-written page view or click events. Mixpanel: with autocapture you do not need extra page view tracking, except in a single-page app. | Both `$mp_web_page_view` and a manual page view event appear per page. |
| Fires in an effect or render | `track` inside a React effect or render that re-runs, or a component mounted twice in development strict mode | Two events milliseconds apart. **[Ours]** |
| Retries | A retry wrapper that resends without a stable event ID. The `$insert_id` property prevents duplicate ingestion. | Duplicates after network errors. |
| Client and server both send it | The same outcome tracked in the browser and on the server | Two events per action from different sources. **[Ours]** |
| CDP plus direct SDK | Segment (or similar) forwards to Mixpanel and the app also calls Mixpanel directly | Every event appears twice. |
| Two installs | Two init calls or two SDK copies (script tag plus package) | Two of every event. **[Ours]** |

## Reporting

Use the troubleshooting template in `spec-template.md`. Rank causes by how strong the evidence in the code is. Say what you checked and found fine, so the user does not repeat it. Ask the user to confirm with the live view before you change code, when a cause depends on something you cannot see (region, token, blockers).
