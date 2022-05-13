import { Router } from "express";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";
import * as controller from "../controllers/usersController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const usersRouter = Router();

usersRouter.post(
  "/users/sign-up",
  validateSchemaMiddleware(signUpSchema),
  controller.register
);
usersRouter.post(
  "/users/sign-in",
  validateSchemaMiddleware(signInSchema),
  controller.login
);

export default usersRouter;
