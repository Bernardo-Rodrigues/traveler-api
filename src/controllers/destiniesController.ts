import { Request, Response } from "express";
import DestinesService from "../services/destinesService.js";

const service = new DestinesService();

export async function list(req: Request, res: Response) {
  const destinies = await service.list();

  res.send(destinies);
}
