import { useEffect } from 'react';
import mixpanel from '../analytics/init';

export function Done() {
  useEffect(() => { mixpanel.track('Onboarding Completed'); }, []);
  return <h1>You are all set</h1>;
}
