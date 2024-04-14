import { SuccessResponse } from '../responses';

type ServerOptions = {
  bearer?: string;
};

type PostServerOptions = ServerOptions & {
  body: {};
};

type GetServerOptions = ServerOptions & {};

export abstract class Server {
  static async post<T>(url: string, options: PostServerOptions): Promise<T> {
    return Server.fetcher<T>(url, {
      method: 'POST',
      headers: Server.headers(options),
      body: JSON.stringify(options.body),
    });
  }

  static get<T>(url: string, options?: GetServerOptions): Promise<T> {
    return Server.fetcher<T>(url, {
      method: 'GET',
      headers: Server.headers(options || {}),
    });
  }

  static async fetcher<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);
    const responseBody = await response.json();

    return responseBody;
  }

  static headers({ bearer }: ServerOptions): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (bearer) {
      headers['Authorization'] = `Bearer ${bearer}`;
    }

    return headers;
  }
}
