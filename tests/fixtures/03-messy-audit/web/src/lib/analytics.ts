import mixpanel from 'mixpanel-browser';
mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, { autocapture: true, track_pageview: true });

// Wrapper used across the app
export function trackEvent(name: string, props: Record<string, unknown> = {}) {
  mixpanel.track(name, props);
}
export default mixpanel;
