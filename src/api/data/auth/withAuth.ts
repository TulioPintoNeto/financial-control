import type {
  Handler,
  HandlerContext,
  HandlerEvent,
  HandlerResponse,
} from '@netlify/functions';
import { ErrorResponse, UnauthorizedRequestError } from '../../responses';
import { AUTH_TOKEN } from '../../../shared/constants';

type CustomHandler = (
  event: HandlerEvent,
  context: HandlerContext
) => Promise<HandlerResponse>;

export class AuthProvider {
  private authVerifyEndpoint =
    'https://identitytoolkit.googleapis.com/v1/accounts:lookup';

  constructor(private server: Server) {}

  protect(handler: CustomHandler): Handler {
    return async (event: HandlerEvent, context: HandlerContext) => {
      const token = this.parseToken(event.headers);

      try {
        await this.verifyToken(token);

        return handler(event, context);
      } catch (e) {
        console.error(e);
        if (e instanceof ErrorResponse) {
          return e.get();
        }

        return { body: 'Unnexpected error happened', statusCode: 401 };
      }
    };
  }

  private parseToken(
    headers: Record<string, string | undefined>
  ): string | null {
    if (AUTH_TOKEN in headers && headers[AUTH_TOKEN]) {
      return headers[AUTH_TOKEN];
    }

    return null;
  }

  private async verifyToken(token: string | null) {
    if (!token) {
      throw new UnauthorizedRequestError('Missing auth token');
    }
    const apiKey = process.env['apiKey'];
    const url = `${this.authVerifyEndpoint}?key=${apiKey}`;
    const body = { idToken: token };

    try {
      await this.server.post(url, { body });
    } catch (e) {
      throw new UnauthorizedRequestError('You are not authorized');
    }
  }
}
