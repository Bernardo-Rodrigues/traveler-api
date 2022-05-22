import { jest, describe, it, expect, afterAll } from "@jest/globals";
import destinationsRepository from "../../src/repositories/destinationsRepository.js";
import { badRequest, notFound } from "../../src/errors/index";
import DestinationsService from "../../src/services/DestinationsService.js";
import { prisma } from "../../src/database.js";
import usersRepository from "../../src/repositories/usersRepository.js";
import { createUser } from "../factories/usersFactory.js";
import dayjs from "dayjs";

const service = new DestinationsService();

describe("#Destinations Service - test suit for edge processing", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("#list - should throw an error if there is no destination registered", () => {
    jest.spyOn(destinationsRepository, "list").mockResolvedValue([]);

    return expect(service.list()).rejects.toEqual(
      Error("No destinations found")
    );
  });

  it("#find - should throw a not found error given a non-existing destination name", () => {
    const user = createUser();
    jest
      .spyOn(usersRepository, "findById")
      .mockResolvedValue({ ...user, id: 1, titleId: 1 });
    jest.spyOn(destinationsRepository, "getByName").mockResolvedValue(null);

    return expect(service.find(1, "destination")).rejects.toEqual(
      notFound("Destination not found")
    );
  });
  it("#favorite - should throw a not found error given a non-existing user id", () => {
    jest.spyOn(usersRepository, "findById").mockResolvedValue(null);

    return expect(service.favorite(1, 1)).rejects.toEqual(
      notFound("User not found")
    );
  });
  it("#favorite - should throw a not found error given a non-existing destination id", () => {
    const user = createUser();
    jest
      .spyOn(usersRepository, "findById")
      .mockResolvedValue({ ...user, id: 1, titleId: 1 });
    jest.spyOn(destinationsRepository, "findById").mockResolvedValue(null);

    return expect(service.favorite(1, 1)).rejects.toEqual(
      notFound("Destination not found")
    );
  });
  it("#unfavorite - should throw a not found error given a non-existing user id", () => {
    jest.spyOn(usersRepository, "findById").mockResolvedValue(null);

    return expect(service.unfavorite(1, 1)).rejects.toEqual(
      notFound("User not found")
    );
  });
  it("#unfavorite - should throw a not found error given a non-existing destination id", () => {
    const user = createUser();
    jest
      .spyOn(usersRepository, "findById")
      .mockResolvedValue({ ...user, id: 1, titleId: 1 });
    jest.spyOn(destinationsRepository, "findById").mockResolvedValue(null);

    return expect(service.unfavorite(1, 1)).rejects.toEqual(
      notFound("Destination not found")
    );
  });
  it("#listFavorites - should throw a not found error given a non-existing destination name", () => {
    jest.spyOn(usersRepository, "findById").mockResolvedValue(null);

    return expect(service.listFavorites(1)).rejects.toEqual(
      notFound("User not found")
    );
  });
});
