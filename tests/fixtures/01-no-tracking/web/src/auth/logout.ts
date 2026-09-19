export async function logout() {
  await fetch('/api/logout', { method: 'POST' });
  localStorage.removeItem('session');
  window.location.href = '/login';
}
