import { jest, describe, it, expect } from "@jest/globals";
import usersRepository from "../../src/repositories/usersRepository.js";
import travelsService from "../../src/services/TravelsService.js";
import { prisma } from "../../src/database.js";
import { notFound } from "../../src/errors/index.js";

const service = new travelsService();

describe("#Travels Service - test suit for edge processing", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("#listUpcomingTrips - should throw a not found error given a non-existing user id", () => {
    jest.spyOn(usersRepository, "findById").mockResolvedValue(null);

    return expect(service.listUpcomingTrips(1)).rejects.toEqual(
      notFound("User not found")
    );
  });
});
