import { Router } from 'express';
import { db } from '../db';

export const billing = Router();

// Called by the payment provider when a subscription starts
billing.post('/webhooks/billing', async (req, res) => {
  const event = req.body;
  if (event.type === 'subscription.started') {
    await db.users.update(event.userId, { plan: event.plan, billingPeriod: event.period });
  }
  res.json({ received: true });
});
