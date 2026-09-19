import Mixpanel from 'mixpanel';
const mp = Mixpanel.init(process.env.MIXPANEL_TOKEN!);

export async function createProject(req, res) {
  const project = await db.projects.create(req.body);
  mp.track('project_created', { distinct_id: req.user.id });
  res.status(201).json(project);
}
