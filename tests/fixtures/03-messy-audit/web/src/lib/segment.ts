import { AnalyticsBrowser } from '@segment/analytics-next';
export const analytics = AnalyticsBrowser.load({ writeKey: import.meta.env.VITE_SEGMENT_KEY });
export function segmentTrack(name: string) { analytics.track(name); }
