#!/usr/bin/env bash
# find_tracking_calls.sh
# A fast first scan for Mixpanel-related code. It lists CANDIDATES with file and line.
# It is a starting point, not the answer: it cannot resolve wrappers, dynamic event
# names or code behind flags. Read the code before trusting any line.
#
# Usage: bash find_tracking_calls.sh [project_root]   (default: current directory)
# Works on macOS and Linux. Makes no network calls. Redacts anything that looks like
# a Mixpanel project token (32 hex characters) so tokens are never printed.

set -u
ROOT="${1:-.}"

if [ ! -d "$ROOT" ]; then
  echo "Not a directory: $ROOT" >&2
  exit 1
fi

INCLUDES=(
  --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'
  --include='*.mjs' --include='*.cjs' --include='*.vue' --include='*.svelte'
  --include='*.html' --include='*.py' --include='*.rb' --include='*.go'
  --include='*.java' --include='*.kt' --include='*.swift' --include='*.m'
  --include='*.dart' --include='*.php' --include='*.cs'
)
EXCLUDES=(
  --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist
  --exclude-dir=build --exclude-dir=.next --exclude-dir=.nuxt
  --exclude-dir=vendor --exclude-dir=venv --exclude-dir=.venv
  --exclude-dir=__pycache__ --exclude-dir=coverage --exclude-dir=Pods
  --exclude-dir=.gradle --exclude-dir=out
)

redact() {
  sed -E 's/[0-9a-fA-F]{32}/<token-redacted>/g'
}

# section "Title" "extended-regex"
section() {
  local title="$1" pattern="$2" out
  out=$(grep -rnIE "${INCLUDES[@]}" "${EXCLUDES[@]}" -e "$pattern" "$ROOT" 2>/dev/null | redact)
  echo
  echo "== $title =="
  if [ -z "$out" ]; then
    echo "(none found)"
  else
    echo "$out" | sed -E "s|^\./||"
    echo "-- $(echo "$out" | wc -l | tr -d ' ') line(s)"
  fi
}

echo "Mixpanel tracking scan of: $ROOT"
echo "These are candidates only. Wrappers, dynamic names and other repos are NOT resolved."

section "Mixpanel imports and packages" \
  "mixpanel-browser|mixpanel-react-native|mixpanel-node|from mixpanel|import mixpanel|require\(['\"]mixpanel|MixpanelAPI|Mixpanel\.(init|sharedInstance|getInstance)|cdn\.mxpnl\.com|import Mixpanel|Mixpanel\("

section "Initialisation, region, autocapture and page view settings" \
  "mixpanel\.init|Mixpanel\.init|autocapture|track_pageview|api_host|api-eu\.mixpanel|api-in\.mixpanel|opt_out_tracking_by_default|record_sessions_percent|property_blacklist|serverURL|server_url"

section "Event tracking calls" \
  "mixpanel\.track\(|mixpanel\.track_[a-z_]+\(|\.track\(|\.track_event\(|\.trackEvent\(|track\(['\"\`]|mp\.track|import_data\(|\.import\("

section "Timed events" \
  "time_event|timeEvent"

section "Identity (identify, reset, alias)" \
  "\.identify\(|\.reset\(\)|\.alias\(|\.create_alias\(|\.clear_super_properties"

section "Profiles and groups" \
  "people\.(set|set_once|increment|append|union|unset|delete_user|track_charge)|people_set|people_increment|set_group|add_group|get_group|group_set|\.getPeople\(\)"

section "Super properties" \
  "\.register\(|\.register_once\(|\.unregister\(|registerSuperProperties"

section "Opt-out and consent" \
  "opt_out_tracking|opt_in_tracking|has_opted_out|optOutTracking|optInTracking|consent"

section "Other analytics or CDP present (check before adding Mixpanel)" \
  "analytics\.(track|identify|page)\(|segment|rudderstack|RudderAnalytics|mparticle|gtag\(|dataLayer\.push|amplitude|posthog|@vercel/analytics|ga\('send"

section "Possibly dynamic event names (built from variables, cannot be resolved by grep)" \
  "\.track\(\s*(\`|[A-Za-z_][A-Za-z0-9_.]*\s*[,)]|['\"][^'\"]*['\"]\s*\+)"

section "Test or debug looking events" \
  "track\([^)]*['\"\`][^'\"\`]*(test|debug|foo|bar|tmp|asdf)[^'\"\`]*['\"\`]"

echo
echo "Next step: read the files above. Find any wrapper (a function that calls track) and search for its callers too."
