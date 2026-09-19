import { trackEvent } from '../lib/analytics';

export function Form() {
  return (
    <form>
      <input placeholder="Name" onFocus={() => trackEvent('Name Field Focused')} />
      <input placeholder="Email" onFocus={() => trackEvent('Email Field Focused')} />
      <button onClick={() => trackEvent('register_button_clicked')}>Register</button>
    </form>
  );
}
