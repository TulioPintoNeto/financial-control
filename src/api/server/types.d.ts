type ServerOptions = {
  bearer?: string;
};

type PostServerOptions = ServerOptions & {
  body: {};
};

type GetServerOptions = ServerOptions & {};

interface Server {
  post<T>(url: string, options: PostServerOptions): Promise<T>;
  get<T>(url: string, options?: GetServerOptions): Promise<T>;
}
