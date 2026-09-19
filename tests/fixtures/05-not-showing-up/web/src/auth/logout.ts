export async function onLogout() {
  await fetch('/api/logout', { method: 'POST' });
  window.location.href = '/login';
}
