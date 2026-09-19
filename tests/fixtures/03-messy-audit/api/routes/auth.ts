import Mixpanel from 'mixpanel';
const mp = Mixpanel.init(process.env.MIXPANEL_TOKEN!);

export async function signup(req, res) {
  const user = await createUser(req.body);
  mp.track('signup_completed', { distinct_id: user.id, method: req.body.method });
  res.status(201).json(user);
}
