import { jest, describe, it, expect } from "@jest/globals";
import usersRepository from "../../src/repositories/usersRepository.js";
import { conflict } from "../../src/errors/index";
import usersService from "../../src/services/usersService.js";
import { createUser } from "../factories/usersFactory.js";

const service = new usersService();

describe("#Users Service - test suit for edge processing", () => {
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
      .mockResolvedValue({ ...userData, id: 1 });

    expect(service.register(userData)).rejects.toEqual(
      conflict("User already registered")
    );
  });
});
