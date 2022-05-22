import { Request, Response } from "express";
import { UserInsertData } from "../repositories/usersRepository.js";
import UsersService from "../services/UsersService.js";

const service = new UsersService();

export async function register(req: Request, res: Response) {
  const userData: UserInsertData = req.body;

  await service.register(userData);

  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const userData = req.body;

  const authData = await service.login(userData);

  res.send(authData);
}

export async function edit(req: Request, res: Response) {
  const { userId } = res.locals.user;
  const userData = req.body;

  const editData = await service.edit(userData, userId);

  res.send(editData);
}
