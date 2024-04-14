import { HandlerEvent } from '@netlify/functions';
import { BadRequestError } from '../../responses';
import { DateTime } from '../../utils/DateTime';

export const parseQuery = (event: HandlerEvent): GetActivitiesQuery => {
  const queryParams = event.queryStringParameters;
  if (!queryParams) {
    throw BadRequestError.missingQuery();
  }

  if (!queryParams['date']) {
    throw new BadRequestError('Missing the following query param: date');
  }

  const date = new DateTime(queryParams['date']);

  if (!date.isValid) {
    throw new BadRequestError('Invalid format for the query param: date');
  }

  return { date };
};
