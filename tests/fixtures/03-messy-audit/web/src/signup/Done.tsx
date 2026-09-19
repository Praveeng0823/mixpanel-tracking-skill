import { useEffect } from 'react';
import { trackEvent } from '../lib/analytics';

export function Done({ plan }: { plan: string }) {
  useEffect(() => { trackEvent('Signup Completed', { plan }); }, []);
  return <h1>Welcome</h1>;
}
