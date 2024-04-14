import { UnauthorizedRequestError } from '../../responses';
import { Server } from '../../server';

const endpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup';

export const verifyToken = async (token: string | null) => {
  if (!token) {
    throw new UnauthorizedRequestError('Missing auth token');
  }
  const apiKey = process.env['apiKey'];
  const url = `${endpoint}?key=${apiKey}`;
  const body = { idToken: token };

  try {
    await Server.post(url, { body });
  } catch (e) {
    throw new UnauthorizedRequestError('You are not authorized');
  }
};
