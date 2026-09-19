import { useEffect } from 'react';
import mixpanel from '../analytics/init';

export function Step3({ next }: { next: () => void }) {
  useEffect(() => { mixpanel.track('Onboarding Step 3 Viewed'); }, []);
  return (
    <div>
      <span onClick={() => mixpanel.track('Onboarding Tooltip Opened')}>?</span>
      <button onClick={() => { mixpanel.track('Onboarding Step 3 Next Clicked'); next(); }}>Next</button>
      <button onClick={() => { mixpanel.track('Onboarding Skipped Step 3'); next(); }}>Skip</button>
    </div>
  );
}
