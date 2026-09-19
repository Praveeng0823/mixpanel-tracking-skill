import { useEffect } from 'react';
import mixpanel from '../analytics/init';

export function Step2({ next, back }: { next: () => void; back: () => void }) {
  useEffect(() => { mixpanel.track('Onboarding Step 2 Viewed'); }, []);
  return (
    <div>
      <input placeholder="Workspace name" />
      <button onClick={() => { mixpanel.track('Onboarding Back Clicked'); back(); }}>Back</button>
      <button onClick={() => { mixpanel.track('Onboarding Step 2 Next Clicked'); next(); }}>Next</button>
    </div>
  );
}
