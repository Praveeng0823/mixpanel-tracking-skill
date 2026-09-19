import { trackEvent } from '../lib/analytics';

export function onRouteChange(page: string) {
  trackEvent(`${page}_viewed`);
}
