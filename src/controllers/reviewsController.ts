import { Response } from "express";
import AuthenticatedRequest from "../interfaces/AuthenticatedRequest.js";
import ReviewsService from "../services/ReviewsService.js";

const service = new ReviewsService();

export async function add(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.auth;
  const destinationId = parseInt(req.params.id);
  const { note } = req.body;

  await service.add(userId, destinationId, note);

  res.sendStatus(201);
}
