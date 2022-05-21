import { Request, Response } from "express";
import ReviewsService from "../services/ReviewsService.js";

const service = new ReviewsService();

export async function add(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const destinationId = parseInt(req.params.id);
  const { note } = req.body;

  await service.add(userId, destinationId, note);

  res.sendStatus(201);
}
