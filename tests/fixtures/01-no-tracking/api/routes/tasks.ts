import { Router } from 'express';
import { db } from '../db';

export const tasks = Router();

tasks.post('/projects/:id/tasks', async (req, res) => {
  const task = await db.tasks.create({ projectId: req.params.id, title: req.body.title, createdBy: req.user.id });
  res.status(201).json(task);
});

tasks.patch('/tasks/:id', async (req, res) => {
  const task = await db.tasks.update(req.params.id, req.body);
  res.json(task);
});
