import HttpError from "./HttpError.js";

const unauthorized = (message?: string) => new HttpError(401, message);
const conflict = (message?: string) => new HttpError(409, message);
const unprocessableEntity = (message?: string) => new HttpError(422, message);

export { conflict, unprocessableEntity, unauthorized };
