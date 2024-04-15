import { HandlerEvent } from '@netlify/functions';
import {
  BadRequestError,
  InfiniteLoopError,
  SuccessResponse,
} from './../../responses/index';
import { DateTime } from '../../utils/DateTime';

export class Activities {
  date!: DateTime;

  constructor(private server: Server) {}

  async get(event: HandlerEvent) {
    this.parseDateFrom(event);
    const allActivities = await this.getAllActivities();

    return new SuccessResponse(allActivities);
  }

  private parseDateFrom(event: HandlerEvent) {
    const queryParams = event.queryStringParameters;
    if (!queryParams) {
      throw BadRequestError.missingQuery();
    }

    if (!queryParams['date']) {
      throw new BadRequestError('Missing the following query param: date');
    }

    this.date = new DateTime(queryParams['date']);

    if (!this.date.isValid) {
      throw new BadRequestError('Invalid format for the query param: date');
    }
  }

  private async getAllActivities() {
    const activities: Activity[] = [];
    const getActivity = this.getActivityForMonth();

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
  }

  private getActivityForMonth() {
    return (cursor: string | undefined): Promise<GetActivitiesResponse> => {
      const profileId = process.env['profileId'];
      const endpoint = process.env['wiseHost'];
      const token = process.env['wiseToken'];
      const searchParams = new URLSearchParams({
        size: '100',
        since: this.date.firstDayOfMonth,
        until: this.date.lastDayOfMonth,
      });

      if (cursor) {
        searchParams.append('nextCursor', cursor);
      }

      const url = `${endpoint}/v1/profiles/${profileId}/activities?${searchParams.toString()}`;

      return this.server.get<GetActivitiesResponse>(url, {
        bearer: token,
      });
    };
  }
}
