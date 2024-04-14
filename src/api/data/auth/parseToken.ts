import { AUTH_TOKEN } from '../../../shared/constants';

export const parseToken = (
  headers: Record<string, string | undefined>
): string | null => {
  if (AUTH_TOKEN in headers && headers[AUTH_TOKEN]) {
    return headers[AUTH_TOKEN];
  }

  return null;
};
