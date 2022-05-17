import { jest, describe, it, expect } from "@jest/globals";
import destiniesRepository from "../../src/repositories/destiniesRepository.js";
import { notFound } from "../../src/errors/index";
import destinesService from "../../src/services/destinesService.js";
import { prisma } from "../../src/database.js";
import usersRepository from "../../src/repositories/usersRepository.js";
import { createUser } from "../factories/usersFactory.js";

const service = new destinesService();

describe("#Destinies Service - test suit for edge processing", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("#list - should throw an error if there is no destination registered", () => {
    jest.spyOn(destiniesRepository, "list").mockResolvedValue([]);

    expect(service.list()).rejects.toEqual(Error("No destinies found"));
  });

  it("#find - should throw a not found error given a non-existing destiny name", () => {
    jest.spyOn(destiniesRepository, "get").mockResolvedValue(null);

    expect(service.find(1, "destiny")).rejects.toEqual(
      notFound("Destiny not found")
    );
  });
  it("#favorite - should throw a not found error given a non-existing user id", () => {
    jest.spyOn(usersRepository, "findById").mockResolvedValue(null);

    expect(service.favorite(1, 1)).rejects.toEqual(notFound("User not found"));
  });
  it("#favorite - should throw a not found error given a non-existing destiny id", () => {
    const user = createUser();
    jest
      .spyOn(usersRepository, "findById")
      .mockResolvedValue({ ...user, id: 1 });
    jest.spyOn(destiniesRepository, "findById").mockResolvedValue(null);

    expect(service.favorite(1, 1)).rejects.toEqual(
      notFound("Destiny not found")
    );
  });
  it("#unfavorite - should throw a not found error given a non-existing user id", () => {
    jest.spyOn(usersRepository, "findById").mockResolvedValue(null);

    expect(service.unfavorite(1, 1)).rejects.toEqual(
      notFound("User not found")
    );
  });
  it("#unfavorite - should throw a not found error given a non-existing destiny id", () => {
    const user = createUser();
    jest
      .spyOn(usersRepository, "findById")
      .mockResolvedValue({ ...user, id: 1 });
    jest.spyOn(destiniesRepository, "findById").mockResolvedValue(null);

    expect(service.unfavorite(1, 1)).rejects.toEqual(
      notFound("Destiny not found")
    );
  });
  it("#findlistFavorites - should throw a not found error given a non-existing destiny name", () => {
    jest.spyOn(usersRepository, "findById").mockResolvedValue(null);

    expect(service.listFavorites(1)).rejects.toEqual(
      notFound("User not found")
    );
  });
});
