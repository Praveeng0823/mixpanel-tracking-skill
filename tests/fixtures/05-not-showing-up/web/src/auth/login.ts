import mixpanel from '../lib/analytics';

export async function onLogin(user: { id: string }) {
  mixpanel.identify(user.id);
  window.location.href = '/projects';
}
