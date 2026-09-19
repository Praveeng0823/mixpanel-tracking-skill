import { Router } from 'express';
import { db } from '../db';

export const projects = Router();

projects.post('/projects', async (req, res) => {
  const project = await db.projects.create({ name: req.body.name, ownerId: req.user.id });
  res.status(201).json(project);
});

projects.delete('/projects/:id', async (req, res) => {
  await db.projects.remove(req.params.id, req.user.id);
  res.status(204).end();
});
