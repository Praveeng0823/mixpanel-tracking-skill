import { Router } from 'express';
import { db } from '../db';
import { hash, verify, createSession } from '../lib/auth';

export const auth = Router();

auth.post('/login', async (req, res) => {
  const user = await db.users.findByEmail(req.body.email);
  if (!user || !(await verify(req.body.password, user.passwordHash))) {
    return res.status(401).json({ error: 'invalid_credentials' });
  }
  const session = await createSession(user.id);
  res.json({ userId: user.id, session });
});

auth.post('/signup', async (req, res) => {
  const { email, password, name, method } = req.body;
  const exists = await db.users.findByEmail(email);
  if (exists) return res.status(409).json({ error: 'email_taken' });
  const user = await db.users.create({ email, name, passwordHash: await hash(password), signupMethod: method });
  const session = await createSession(user.id);
  res.status(201).json({ userId: user.id, session });
});
