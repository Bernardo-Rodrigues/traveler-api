import { Request, Response } from "express";
import TitlesService from "../services/TitlesService.js";

const service = new TitlesService();

export async function list(req: Request, res: Response) {
  const username = req.query.username as string;

  const titles = await service.list(username);

  res.send(titles);
}
