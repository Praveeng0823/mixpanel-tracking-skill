import Mixpanel from 'mixpanel';
const mp = Mixpanel.init(process.env.MIXPANEL_TOKEN!);

// The one place all server events go through
export function track(userId: string, name: string, props: Record<string, unknown> = {}) {
  mp.track(name, { distinct_id: userId, ...props });
}
