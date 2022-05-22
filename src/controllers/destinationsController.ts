import { Request, Response } from "express";
import DestinationsService from "../services/DestinationsService.js";

const service = new DestinationsService();

export async function list(req: Request, res: Response) {
  const destiniations = await service.list();

  res.send(destiniations);
}

export async function listByFavorites(req: Request, res: Response) {
  const { userId } = res.locals.user;

  const favorites = await service.listFavorites(userId);

  res.send(favorites);
}

export async function listTop(req: Request, res: Response) {
  const continent = req.query.continent as string;

  const destinations = await service.listTop(continent);

  res.send(destinations);
}

export async function find(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const { name } = req.params;

  const destiniations = await service.find(userId, name);

  res.send(destiniations);
}

export async function favorite(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const destinationId = parseInt(req.params.id);

  await service.favorite(userId, destinationId);

  res.sendStatus(201);
}

export async function unfavorite(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const destinationId = parseInt(req.params.id);

  await service.unfavorite(userId, destinationId);

  res.sendStatus(200);
}

export async function listTips(req: Request, res: Response) {
  const destinationId = parseInt(req.params.id);

  const tips = await service.listTips(destinationId);

  res.send(tips);
}
