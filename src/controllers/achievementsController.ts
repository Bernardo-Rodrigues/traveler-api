import { Request, Response } from "express";
import AchievementService from "../services/AchievementService.js";

const service = new AchievementService();

export async function get(req: Request, res: Response) {
  const destinationId = parseInt(req.params.id);
  const { userId } = res.locals.user;

  const achievement = await service.get(userId, destinationId);

  res.status(201).send(achievement);
}

export async function listByUser(req: Request, res: Response) {
  const { userId } = res.locals.user;

  const achievements = await service.listByUser(userId);

  res.send(achievements);
}
