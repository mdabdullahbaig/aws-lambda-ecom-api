import { StatusCodes, Headers } from "../utils/index.js";
import RequestHandler from "./RequestHandler.js";
import ResponseHandler from "./ResponseHandler.js";

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const response = await app(event);
    return {
      statusCode: StatusCodes.OK,
      headers: Headers.GET,
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      headers: Headers.GET,
      body: JSON.stringify({
        message: err.message || "An unknown error occured!",
      }),
    };
  }
};

const app = async (event) => {
  const requestHandler = RequestHandler.create(JSON.parse(event?.body));
  const requestHandlerResponse = await requestHandler.execute();
  const responseHandler = ResponseHandler.create(requestHandlerResponse);
  const responseHandlerResponse = responseHandler.translator();
  return responseHandlerResponse;
};
