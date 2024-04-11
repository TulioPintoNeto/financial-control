import type { Config, Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  return {
    body: JSON.stringify({ message: "Hello World" }),
    statusCode: 200,
  };
};

export const config: Config = {
  path: "/api/hello",
};
