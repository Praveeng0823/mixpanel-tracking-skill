import { useState } from 'react';
import { api } from '../api';

export function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  async function onSubmit() {
    const res = await api.post('/signup', { ...form, method: 'email' });
    if (res.ok) window.location.href = '/projects';
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
      <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" />
      <button type="submit">Create account</button>
    </form>
  );
}
