import { useState } from 'react';
import { Page1 } from './Page1';
import { Page2 } from './Page2';
import { Page3 } from './Page3';
import { Page4 } from './Page4';

export function Onboarding() {
  const [page, setPage] = useState(1);
  const next = () => (page < 4 ? setPage(page + 1) : (window.location.href = '/projects'));
  return [null, <Page1 next={next} />, <Page2 next={next} />, <Page3 next={next} />, <Page4 next={next} />][page];
}
