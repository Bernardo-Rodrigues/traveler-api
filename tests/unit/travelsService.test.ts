import { jest, describe, it, expect } from "@jest/globals";
import usersRepository from "../../src/repositories/usersRepository.js";
import destinationsRepository from "../../src/repositories/destinationsRepository.js";
import travelsService from "../../src/services/TravelsService.js";
import { prisma } from "../../src/database.js";
import { badRequest, notFound } from "../../src/errors/index.js";
import { createUser } from "../factories/usersFactory.js";
import dayjs from "dayjs";

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

  it("#addTravel - should throw a not found error given a non-existing user id", () => {
    jest.spyOn(usersRepository, "findById").mockResolvedValue(null);

    return expect(
      service.addTravel({
        userId: 1,
        destinationId: 1,
        startDate: dayjs() as unknown as Date,
        endDate: dayjs().add(1, "day") as unknown as Date,
      })
    ).rejects.toEqual(notFound("User not found"));
  });
  it("#addTravel - should throw a not found error given a non-existing destination id", () => {
    const user = createUser();
    jest
      .spyOn(usersRepository, "findById")
      .mockResolvedValue({ ...user, id: 1, titleId: 1 });
    jest.spyOn(destinationsRepository, "findById").mockResolvedValue(null);

    return expect(
      service.addTravel({
        userId: 1,
        destinationId: 1,
        startDate: dayjs() as unknown as Date,
        endDate: dayjs().add(1, "day") as unknown as Date,
      })
    ).rejects.toEqual(notFound("Destination not found"));
  });
  it("#addTravel - should throw a bad request error given invalid dates", () => {
    const user = createUser();
    jest
      .spyOn(usersRepository, "findById")
      .mockResolvedValue({ ...user, id: 1, titleId: 1 });
    jest
      .spyOn(destinationsRepository, "findById")
      .mockResolvedValue({ id: 1, imageLink: "", countryId: 1, name: "" });

    jest.spyOn(service, "checkDates").mockReturnValue(false);

    return expect(
      service.addTravel({
        userId: 1,
        destinationId: 1,
        startDate: dayjs() as unknown as Date,
        endDate: dayjs().add(1, "day") as unknown as Date,
      })
    ).rejects.toEqual(badRequest("Dates are invalid"));
  });
});
