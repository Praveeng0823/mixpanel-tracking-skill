import { useEffect, useState } from 'react';
import mixpanel from '../analytics/init';

export function Step1({ next }: { next: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => { mixpanel.track('Onboarding Step 1 Viewed'); }, []);
  return (
    <div>
      <input placeholder="Name" onFocus={() => mixpanel.track('Name Field Focused')} onChange={(e) => { setName(e.target.value); mixpanel.track('Name Typed'); }} />
      <input placeholder="Email" onFocus={() => mixpanel.track('Email Field Focused')} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={() => { mixpanel.track('Onboarding Step 1 Register Clicked'); next(); }}>Register</button>
    </div>
  );
}
