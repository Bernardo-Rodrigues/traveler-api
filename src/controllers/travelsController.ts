import { Response } from "express";
import AuthenticatedRequest from "../interfaces/AuthenticatedRequest.js";
import TravelsService from "../services/TravelsService.js";

const service = new TravelsService();

export async function listUpcomingTrips(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req.auth;

  const trips = await service.listUpcomingTrips(userId);

  res.send(trips);
}

export async function getCurrentTrip(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.auth;

  const currentTrip = await service.getCurrentTrip(userId);

  res.send(currentTrip);
}

export async function addTravel(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.auth;

  await service.addTravel({ ...req.body, userId });

  res.sendStatus(201);
}
