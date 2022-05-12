import { Router } from "express";
import userSchema from "../schemas/usersSchema.js";
import * as controller from "../controllers/usersController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const usersRouter = Router();

usersRouter.post(
  "/users/sign-up",
  validateSchemaMiddleware(userSchema),
  controller.register
);

export default usersRouter;
