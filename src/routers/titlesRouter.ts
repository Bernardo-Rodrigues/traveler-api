import { Router } from "express";
import * as controller from "../controllers/titlesController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const titlesRouter = Router();

titlesRouter.get("/titles", validateTokenMiddleware, controller.list);

export default titlesRouter;
