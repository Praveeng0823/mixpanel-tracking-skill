import { db } from '../db';

// NEW feature: share a project with someone by email, or by a public link
export async function shareProject(req, res) {
  const { projectId, email, permission } = req.body;
  await db.shares.create({ projectId, email, permission, sharedBy: req.user.id });
  await sendShareEmail(email, projectId);
  res.status(201).json({ ok: true });
}

export async function createShareLink(req, res) {
  const link = await db.links.create({ projectId: req.body.projectId, permission: 'view' });
  res.status(201).json({ url: link.url });
}
