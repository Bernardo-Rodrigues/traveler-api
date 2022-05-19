import { Router } from "express";
import * as controller from "../controllers/reviewsController.js";
import validateTokenMiddleware from "../middlewares/validateTokenMiddleware.js";

const reviewsRouter = Router();

reviewsRouter.post(
  "/reviews/destinies/:id",
  validateTokenMiddleware,
  controller.add
);

export default reviewsRouter;
