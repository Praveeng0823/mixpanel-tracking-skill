import Mixpanel from 'mixpanel';
const mp = Mixpanel.init(process.env.MIXPANEL_TOKEN!);

// Runs as a serverless function: it ends as soon as the response is sent
export async function handler(req, res) {
  const project = await db.projects.create(req.body);
  mp.track('project_created', { plan: req.user.plan });
  res.status(201).json(project);
}
