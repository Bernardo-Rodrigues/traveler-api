import { Router } from "express";
import * as controller from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.post("/user-events/create", controller.register);
usersRouter.post("/user-events/delete", controller.remove);

export default usersRouter;
