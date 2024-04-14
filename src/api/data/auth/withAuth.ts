import type {
  Config,
  Handler,
  HandlerContext,
  HandlerEvent,
  HandlerResponse,
} from '@netlify/functions';
import { parseToken } from './parseToken';
import { verifyToken } from './verifyToken';
import { ErrorResponse } from '../../responses';

type CustomHandler = (
  event: HandlerEvent,
  context: HandlerContext
) => Promise<HandlerResponse>;

export const withAuth =
  (handler: CustomHandler): Handler =>
  async (event: HandlerEvent, context: HandlerContext) => {
    const token = parseToken(event.headers);

    try {
      await verifyToken(token);

      return handler(event, context);
    } catch (e) {
      console.error(e);
      if (e instanceof ErrorResponse) {
        return e.get();
      }

      return { body: 'Unnexpected error happened', statusCode: 401 };
    }
  };

export const config: Config = {
  path: '/api/activities',
};
