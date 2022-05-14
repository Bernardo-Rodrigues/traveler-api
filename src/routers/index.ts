import { Router } from "express";
import avatarsRouter from "./avatarsRouter.js";
import destiniesRouter from "./destiniesRouter.js";
import usersRouter from "./usersRouter.js";

const router = Router();

router.use(avatarsRouter);
router.use(usersRouter);
router.use(destiniesRouter);

export default router;
