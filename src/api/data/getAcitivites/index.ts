import { SuccessResponse } from './../../responses/index';
import { getAllAcitivities } from './getAllAcitivities';

export const getActivities = async (query: GetActivitiesQuery) => {
  const allActivities = await getAllAcitivities(query.date);

  return new SuccessResponse(allActivities);
};
