import { Router } from "express";
import * as controller from "../controllers/avatarsController.js";

const avatarsRouter = Router();

avatarsRouter.get("/avatars", controller.list);

export default avatarsRouter;
