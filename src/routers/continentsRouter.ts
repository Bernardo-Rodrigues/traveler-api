import { Router } from "express";
import * as controller from "../controllers/continentsController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const continentsRouter = Router();

continentsRouter.get("/continents", validateTokenMiddleware, controller.list);

export default continentsRouter;
