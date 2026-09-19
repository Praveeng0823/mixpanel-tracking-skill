import Mixpanel from 'mixpanel';
const mp = Mixpanel.init(process.env.MIXPANEL_TOKEN!);

export async function onSubscriptionStarted(event) {
  mp.track('plan_upgraded', { distinct_id: event.userId, planType: event.plan, plan_price: '49.99' });
}
