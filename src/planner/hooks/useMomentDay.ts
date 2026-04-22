import { useEffect, useState } from 'react';

import { getMillisecondsUntilNextMomentDay, getMomentDay } from '@planner/helpers/planner';

export const useMomentDay = () => {
  const [momentDay, setMomentDay] = useState(() => getMomentDay());

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setMomentDay(getMomentDay());
    }, getMillisecondsUntilNextMomentDay());

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [momentDay]);

  return momentDay;
};
