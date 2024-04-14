import { Server } from '../../server';
import { DateTime } from '../../utils/DateTime';

export const getActivityForMonth =
  (date: DateTime) =>
  (cursor: string | undefined): Promise<GetActivitiesResponse> => {
    const profileId = process.env['profileId'];
    const endpoint = process.env['wiseHost'];
    const token = process.env['wiseToken'];
    const searchParams = new URLSearchParams({
      size: '100',
      since: date.firstDayOfMonth,
      until: date.lastDayOfMonth,
    });

    if (cursor) {
      searchParams.append('cursor', cursor);
    }

    const url = `${endpoint}/v1/profiles/${profileId}/activities?${searchParams.toString()}`;

    return Server.get<GetActivitiesResponse>(url, { bearer: token });
  };
