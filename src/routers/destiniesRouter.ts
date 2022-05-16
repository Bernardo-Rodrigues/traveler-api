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
destiniesRouter.post(
  "/destinies/:id/favorite",
  validateTokenMiddleware,
  controller.favorite
);
destiniesRouter.post(
  "/destinies/:id/unfavorite",
  validateTokenMiddleware,
  controller.unfavorite
);

export default destiniesRouter;
