import { Request, Response } from "express";
import ContinestsService from "../services/ContinestsService.js";

const service = new ContinestsService();

export async function list(req: Request, res: Response) {
  const continents = await service.list();

  res.send(continents);
}
