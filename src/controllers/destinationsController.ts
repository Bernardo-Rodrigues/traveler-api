import { Request, Response } from "express";
import AuthenticatedRequest from "../interfaces/AuthenticatedRequest.js";
import DestinationsService from "../services/DestinationsService.js";

const service = new DestinationsService();

export async function list(req: AuthenticatedRequest, res: Response) {
  const name = req.query.name as string;

  const destiniations = await service.list(name);

  res.send(destiniations);
}

export async function listByFavorites(
  req: AuthenticatedRequest,
  res: Response
) {
  const { userId } = req.auth;

  const favorites = await service.listFavorites(userId);

  res.send(favorites);
}

export async function listTop(req: AuthenticatedRequest, res: Response) {
  const continent = req.query.continent as string;
  const { userId } = req.auth;

  const destinations = await service.listTop(userId, continent);

  res.send(destinations);
}

export async function find(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.auth;
  const { name } = req.params;

  const destiniations = await service.find(userId, name);

  res.send(destiniations);
}

export async function favorite(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.auth;
  const destinationId = parseInt(req.params.id);

  await service.favorite(userId, destinationId);

  res.sendStatus(201);
}

export async function unfavorite(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.auth;
  const destinationId = parseInt(req.params.id);

  await service.unfavorite(userId, destinationId);

  res.sendStatus(200);
}

export async function listTips(req: Request, res: Response) {
  const destinationId = parseInt(req.params.id);

  const tips = await service.listTips(destinationId);

  res.send(tips);
}
