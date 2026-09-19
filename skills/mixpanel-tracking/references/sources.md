# Sources

Every Mixpanel rule in this skill traces back to a page below or is labelled as our own recommendation in `mixpanel-concepts.md`. Mixpanel's docs index is at https://docs.mixpanel.com/llms.txt.

Last checked: 2026-09-19. Recheck before every release, because docs change.

Status key:
- **Read**: page read and its rules recorded in `mixpanel-concepts.md`.
- **Read (partial)**: the page gave only part of what we need. Gaps are noted.
- **To read**: not yet read. Nothing from this page may be used until it is.

## Data model, events and properties
| Page | Status | Used for |
|---|---|---|
| https://docs.mixpanel.com/docs/data-structure/concepts | Read | Events, event properties, user profiles, group profiles |
| https://docs.mixpanel.com/docs/data-structure/events-and-properties | Read | Naming convention, casing, limits |
| https://docs.mixpanel.com/docs/data-structure/property-reference/data-type | Read | Supported types and size limits |
| https://docs.mixpanel.com/docs/data-structure/property-reference/reserved-properties | Read | Reserved names and `$` properties |
| https://docs.mixpanel.com/docs/data-structure/property-reference/default-properties | Read | Properties Mixpanel sets automatically |
| https://docs.mixpanel.com/docs/data-structure/user-profiles | Read | Profile update operations, limits |
| https://docs.mixpanel.com/docs/data-structure/group-analytics | Read (partial) | When to use groups. No `set_group` details or limits on this page. |
| https://docs.mixpanel.com/docs/data-structure/group-analytics/group-analytics-implementation | To read | Group implementation |

## Tracking best practices
| Page | Status | Used for |
|---|---|---|
| https://docs.mixpanel.com/docs/tracking-best-practices | Read | Index only, no rules |
| https://docs.mixpanel.com/docs/tracking-best-practices/tracking-plan | Read | What to track, tracking plan as source of truth |
| https://docs.mixpanel.com/docs/tracking-best-practices/server-side-best-practices | Read (partial) | ID responsibility, IP override, page as property. No retry or dedupe guidance on this page. |
| https://docs.mixpanel.com/docs/tracking-best-practices/debugging | Read | Troubleshooting checklist |
| https://docs.mixpanel.com/docs/tracking-best-practices/developer-environments | Read | Dev and prod separation |
| https://docs.mixpanel.com/docs/tracking-best-practices/hot-shard-limits | Read | Daily per-ID volume limits |
| https://docs.mixpanel.com/docs/tracking-best-practices/bot-traffic | Read | `$ignore`, bots, internal traffic |
| https://docs.mixpanel.com/docs/tracking-best-practices/geolocation | To read | IP and geolocation handling |
| https://docs.mixpanel.com/docs/tracking-best-practices/traffic-attribution | To read | UTM and attribution |

## Identity
| Page | Status | Used for |
|---|---|---|
| https://docs.mixpanel.com/docs/tracking-methods/id-management | Read | Simplified vs original ID merge |
| https://docs.mixpanel.com/docs/tracking-methods/id-management/identifying-users-simplified | Read | `identify`, `reset`, `$user_id`, `$device_id` |
| https://docs.mixpanel.com/docs/quickstart/identify-users | To read | Quickstart identify steps |

## SDKs and autocapture
| Page | Status | Used for |
|---|---|---|
| https://docs.mixpanel.com/docs/tracking-methods/sdks/javascript | Read | Init options, page view event, identify, reset, proxy |
| https://docs.mixpanel.com/docs/tracking-methods/autocapture | Read (partial) | Events captured, privacy defaults. Exact event names and duplicate warnings not on this page. |
| https://docs.mixpanel.com/docs/tracking-methods/sdks/nodejs | Read | Init, EU host, async and serverless, 5-day limit |
| https://docs.mixpanel.com/docs/tracking-methods/sdks/python | Read | Init, EU host, 5-day limit, import |
| https://docs.mixpanel.com/docs/quickstart/capture-events/track-events | Read (partial) | Only one relevant sentence about explicit tracking |
| https://docs.mixpanel.com/docs/tracking-methods/sdks/react-native | To read | Mobile, best-effort in v1 |
| https://docs.mixpanel.com/docs/tracking-methods/sdks/swift | To read | Mobile, best-effort in v1 |
| https://docs.mixpanel.com/docs/tracking-methods/sdks/android | To read | Mobile, best-effort in v1 |

## Privacy and residency
| Page | Status | Used for |
|---|---|---|
| https://docs.mixpanel.com/docs/privacy/gdpr-compliance | Read (partial) | Customer controls what is sent. SDK opt-out detail not on this page. |
| https://docs.mixpanel.com/docs/privacy/protecting-user-data | Read | Opt-out, hashing IDs, disable geolocation, property blacklist |
| https://docs.mixpanel.com/docs/privacy/eu-residency | Read | EU hostnames |
| https://docs.mixpanel.com/docs/privacy/in-residency | To read | India hostnames |

## Governance
| Page | Status | Used for |
|---|---|---|
| https://docs.mixpanel.com/docs/data-governance/lexicon | Read | Hide, block, merge behaviour (background knowledge only) |
| https://docs.mixpanel.com/docs/data-governance/data-standards | Read | Enterprise naming enforcement. Does not prescribe a convention. |

## Mixpanel's own agent skills (context, not rules)
| Page | Status | Used for |
|---|---|---|
| https://docs.mixpanel.com/docs/quickstart/install-with-ai | Read | What Mixpanel's setup skill does |
| https://github.com/mixpanel/ai-plugins | Read | Positioning. We write our own text. |

## How these were checked
Rules were taken from summaries of these pages. Numbers, hostnames and quoted wording must be rechecked against the live page before each release. Anything marked "To read" or "Read (partial)" is a gap we close before relying on it.
