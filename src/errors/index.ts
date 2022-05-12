import HttpError from "./HttpError.js";

const conflict = (message?: string) => new HttpError(409, message);
const unprocessableEntity = (message?: string) => new HttpError(422, message);

export { conflict, unprocessableEntity };
