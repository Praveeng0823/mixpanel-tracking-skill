import { trackEvent } from './lib/analytics';
import { segmentTrack } from './lib/segment';

export function Header() {
  return (
    <header>
      <button onClick={() => trackEvent('debug_click')}>Menu</button>
      <button onClick={() => { trackEvent('test_event'); segmentTrack('Upgrade Clicked'); }}>Upgrade</button>
    </header>
  );
}
