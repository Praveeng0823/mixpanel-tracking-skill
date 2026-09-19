import mixpanel from '../lib/analytics';

export async function login(user: { id: string; email: string }) {
  mixpanel.identify(user.email);
  mixpanel.people.set({ $email: user.email });
}
