import { useState } from 'react';
import { api } from '../api';

export function ShareDialog({ projectId, onClose }: { projectId: string; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('view');
  const [copied, setCopied] = useState(false);

  async function send() {
    await api.post('/share', { projectId, email, permission });
    onClose();
  }
  async function copyLink() {
    const { url } = await api.post('/share/link', { projectId });
    await navigator.clipboard.writeText(url);
    setCopied(true);
  }
  return (
    <dialog open>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <select value={permission} onChange={(e) => setPermission(e.target.value)}>
        <option value="view">Can view</option>
        <option value="edit">Can edit</option>
      </select>
      <button onClick={send}>Share</button>
      <button onClick={copyLink}>{copied ? 'Copied' : 'Copy link'}</button>
      <button onClick={onClose}>Close</button>
    </dialog>
  );
}
