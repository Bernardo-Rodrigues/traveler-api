import { jest, describe, it, expect } from "@jest/globals";
import usersRepository from "../../src/repositories/usersRepository.js";
import { conflict, unauthorized } from "../../src/errors/index";
import usersService from "../../src/services/usersService.js";
import { createUser } from "../factories/usersFactory.js";
import { prisma } from "../../src/database.js";
import bcrypt from "bcrypt";

const service = new usersService();

describe("#Users Service - test suit for edge processing", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("#register - should throw a conflict error given an already existing user with the same name", () => {
    const userData = createUser();
    jest
      .spyOn(usersRepository, "findByName")
      .mockResolvedValue({ ...userData, id: 1 });
    jest.spyOn(usersRepository, "findByEmail").mockResolvedValue(null);

    expect(service.register(userData)).rejects.toEqual(
      conflict("User already registered")
    );
  });

  it("#register - should throw a conflict error given an already existing user with the same email", () => {
    const userData = createUser();
    jest.spyOn(usersRepository, "findByName").mockResolvedValue(null);
    jest
      .spyOn(usersRepository, "findByEmail")
      .mockResolvedValue({ ...userData, id: 1, avatar: { imageLink: "" } });

    expect(service.register(userData)).rejects.toEqual(
      conflict("User already registered")
    );
  });

  it("#login - should throw an unauthorized error given a non-existing mail", () => {
    const userData = createUser();
    jest.spyOn(usersRepository, "findByEmail").mockResolvedValue(null);

    return expect(
      service.login({ email: userData.email, password: userData.password })
    ).rejects.toEqual(unauthorized("User does not exist"));
  });

  it("#login - should throw an unauthorized error given a wrong password", () => {
    const userData = createUser();
    jest
      .spyOn(usersRepository, "findByEmail")
      .mockResolvedValue({ ...userData, id: 1, avatar: { imageLink: "" } });
    jest.spyOn(bcrypt, "compareSync").mockReturnValue(false);

    return expect(
      service.login({ email: userData.email, password: userData.password })
    ).rejects.toEqual(unauthorized("User does not exist"));
  });
});
