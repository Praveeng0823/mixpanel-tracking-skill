import { useEffect } from 'react';
import mixpanel from './lib/analytics';

export function PageWatcher({ page }: { page: string }) {
  useEffect(() => { mixpanel.track('Page Viewed', { page }); });
  return null;
}
