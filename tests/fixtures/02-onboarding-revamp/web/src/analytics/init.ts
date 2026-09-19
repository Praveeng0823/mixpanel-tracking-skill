import mixpanel from 'mixpanel-browser';

mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
  autocapture: false,
  track_pageview: false,
  api_host: 'https://api-eu.mixpanel.com',
});

export default mixpanel;
