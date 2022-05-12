import { Router } from "express";
import avatarsRouter from "./avatarsRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();

router.use(avatarsRouter);
router.use(usersRouter);

export default router;
