import { Router } from "express";
import * as controller from "../controllers/destiniesController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const destiniesRouter = Router();

destiniesRouter.get("/destinies", validateTokenMiddleware, controller.list);
destiniesRouter.get(
  "/destinies/:name",
  validateTokenMiddleware,
  controller.find
);

export default destiniesRouter;
