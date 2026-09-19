import mixpanel from 'mixpanel-browser';

mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, { autocapture: true, track_pageview: true });

export default mixpanel;
