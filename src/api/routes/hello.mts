import type { Config, Handler } from "@netlify/functions";

export const hello: Handler = async () => {
  return { body: "Hello, my custom function", statusCode: 200 };
};

export const config: Config = {
  path: "/api/hello",
};
