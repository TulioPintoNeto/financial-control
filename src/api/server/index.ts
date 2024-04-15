export class ServerImpl implements Server {
  post<T>(url: string, options: PostServerOptions): Promise<T> {
    return this.fetcher<T>(url, {
      method: 'POST',
      headers: this.headers(options),
      body: JSON.stringify(options.body),
    });
  }

  get<T>(url: string, options?: GetServerOptions): Promise<T> {
    return this.fetcher<T>(url, {
      method: 'GET',
      headers: this.headers(options || {}),
    });
  }

  private async fetcher<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);
    const responseBody = await response.json();

    return responseBody;
  }

  private headers({ bearer }: ServerOptions): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (bearer) {
      headers['Authorization'] = `Bearer ${bearer}`;
    }

    return headers;
  }
}
