import type { Config, Handler } from "@netlify/functions";
import { ErrorResponse } from "../responses";
import { activities, authProvider } from "../factories/data";

export const handler: Handler = authProvider.protect(async (event) => {
  try {
    const response = await activities.get(event);
    return response.get();
  } catch (e) {
    console.error(e);
    if (e instanceof ErrorResponse) {
      return e.get();
    }

    return { body: "Unnexpected error happened", statusCode: 500 };
  }
});

export const config: Config = {
  path: "/api/activities",
};
