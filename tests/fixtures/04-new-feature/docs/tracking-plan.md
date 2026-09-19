# Tracking plan

Analytics tool: Mixpanel
Data region: US
Naming convention: snake_case, Object Verb, past tense

| Event | What it tracks | Fires at | Side |
|---|---|---|---|
| signup_completed | An account was created | api/routes/auth.ts | server |
| project_created | A project was created | api/routes/projects.ts | server |
| task_created | A task was added | api/routes/tasks.ts | server |
| invite_sent | A person was invited to the team | api/routes/team.ts | server |
