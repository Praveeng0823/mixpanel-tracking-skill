import { track } from '../lib-analytics';

export async function inviteToTeam(req, res) {
  await sendInviteEmail(req.body.email, { teamId: req.user.teamId });
  track(req.user.id, 'invite_sent', { invite_type: 'team' });
  res.json({ ok: true });
}
