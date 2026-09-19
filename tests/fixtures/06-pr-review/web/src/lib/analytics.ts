import mixpanel from 'mixpanel-browser';
export function trackEvent(name: string, props: Record<string, unknown> = {}) { mixpanel.track(name, props); }
