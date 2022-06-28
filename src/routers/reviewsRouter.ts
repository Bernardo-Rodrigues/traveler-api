import { Router } from "express";
import * as controller from "../controllers/reviewsController.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const reviewsRouter = Router();

reviewsRouter.post(
  "/reviews/destinies/:id",
  ClerkExpressRequireAuth(),
  controller.add
);

export default reviewsRouter;
