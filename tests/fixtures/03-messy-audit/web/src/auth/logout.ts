export async function logout() {
  await fetch('/api/logout', { method: 'POST' });
  window.location.href = '/login';
}
