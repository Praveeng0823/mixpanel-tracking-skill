// Old registration page. Not linked from the router any more.
import { trackEvent } from '../lib/analytics';

export function Register() {
  trackEvent('signupCompleted');
  return <div>Register</div>;
}
