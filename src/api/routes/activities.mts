import type { Config, Handler } from "@netlify/functions";
import { withAuth } from "../data/auth/withAuth";
import { ErrorResponse } from "../responses";
import { parseQuery } from "../data/getAcitivites/parseQuery";
import { getActivities } from "../data/getAcitivites";

export const handler: Handler = withAuth(async (event) => {
  try {
    const response = await getActivities(parseQuery(event));
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
