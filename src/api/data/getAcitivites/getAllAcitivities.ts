import { DateTime } from '../../utils/DateTime';
import { InfiniteLoopError } from './../../responses/index';
import { getActivityForMonth } from './getActivityForMonth';

export const getAllAcitivities = async (date: DateTime) => {
  const activities: Activity[] = [];
  const getActivity = getActivityForMonth(date);

  let i = 0;
  let cursor = undefined;
  while (cursor !== null) {
    const response = await getActivity(cursor);
    cursor = response.cursor;
    activities.push(...response.activities);

    i++;
    if (i === 5) throw new InfiniteLoopError();
  }

  return activities;
};
