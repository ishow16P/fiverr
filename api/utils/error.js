import { serverError } from "./response.js";

export const errorHandler = (error, req, res, next) => {
  return serverError(req, res, error.message ? error.message : null);
};
