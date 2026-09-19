import { trackEvent } from '../lib/analytics';
import { api } from '../api';

export async function createProject(name: string) {
  const project = await api.post('/projects', { name });
  trackEvent('Project Made', { projectName: name });
  return project;
}
