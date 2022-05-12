import { Request, Response } from "express";
import { UserInsertData } from "../repositories/usersRepository.js";
import usersService from "../services/usersService.js";

const service = new usersService();

export async function register(req: Request, res: Response) {
  const userData: UserInsertData = req.body;

  await service.register(userData);

  res.sendStatus(201);
}
