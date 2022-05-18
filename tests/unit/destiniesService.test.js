import { jest, describe, it, expect, afterAll } from "@jest/globals";
import destiniesRepository from "../../src/repositories/destiniesRepository.js";
import { badRequest, notFound } from "../../src/errors/index";
import destinesService from "../../src/services/destinesService.js";
import { prisma } from "../../src/database.js";
import usersRepository from "../../src/repositories/usersRepository.js";
import { createUser } from "../factories/usersFactory.js";
import dayjs from "dayjs";
import MockDate from "mockdate";

MockDate.set("2000-11-22");

const service = new destinesService();

jest.mock("dayjs", () => jest.fn(() => "2022-12-12"));

describe("#Destinies Service - test suit for edge processing", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("#list - should throw an error if there is no destination registered", () => {
    jest.spyOn(destiniesRepository, "list").mockResolvedValue([]);

    return expect(service.list()).rejects.toEqual(Error("No destinies found"));
  });

  it("#find - should throw a not found error given a non-existing destiny name", () => {
    jest.spyOn(destiniesRepository, "get").mockResolvedValue(null);

    return expect(service.find(1, "destiny")).rejects.toEqual(
      notFound("Destiny not found")
    );
  });
  it("#favorite - should throw a not found error given a non-existing user id", () => {
    jest.spyOn(usersRepository, "findById").mockResolvedValue(null);

    return expect(service.favorite(1, 1)).rejects.toEqual(
      notFound("User not found")
    );
  });
  it("#favorite - should throw a not found error given a non-existing destiny id", () => {
    const user = createUser();
    jest
      .spyOn(usersRepository, "findById")
      .mockResolvedValue({ ...user, id: 1 });
    jest.spyOn(destiniesRepository, "findById").mockResolvedValue(null);

    return expect(service.favorite(1, 1)).rejects.toEqual(
      notFound("Destiny not found")
    );
  });
  it("#unfavorite - should throw a not found error given a non-existing user id", () => {
    jest.spyOn(usersRepository, "findById").mockResolvedValue(null);

    return expect(service.unfavorite(1, 1)).rejects.toEqual(
      notFound("User not found")
    );
  });
  it("#unfavorite - should throw a not found error given a non-existing destiny id", () => {
    const user = createUser();
    jest
      .spyOn(usersRepository, "findById")
      .mockResolvedValue({ ...user, id: 1 });
    jest.spyOn(destiniesRepository, "findById").mockResolvedValue(null);

    return expect(service.unfavorite(1, 1)).rejects.toEqual(
      notFound("Destiny not found")
    );
  });
  it("#findlistFavorites - should throw a not found error given a non-existing destiny name", () => {
    jest.spyOn(usersRepository, "findById").mockResolvedValue(null);

    return expect(service.listFavorites(1)).rejects.toEqual(
      notFound("User not found")
    );
  });
  it("#addTravel - should throw a not found error given a non-existing user id", () => {
    jest.spyOn(usersRepository, "findById").mockResolvedValue(null);

    return expect(
      service.addTravel({
        userId: 1,
        destinyId: 1,
        startDate: dayjs(),
        endDate: dayjs().add(1, "day"),
      })
    ).rejects.toEqual(notFound("User not found"));
  });
  it("#addTravel - should throw a not found error given a non-existing destiny id", () => {
    const user = createUser();
    jest
      .spyOn(usersRepository, "findById")
      .mockResolvedValue({ ...user, id: 1 });
    jest.spyOn(destiniesRepository, "findById").mockResolvedValue(null);

    return expect(
      service.addTravel({
        userId: 1,
        destinyId: 1,
        startDate: dayjs(),
        endDate: dayjs().add(1, "day"),
      })
    ).rejects.toEqual(notFound("Destiny not found"));
  });
  it("#addTravel - should throw a bad request error given invalid dates", () => {
    const user = createUser();
    jest
      .spyOn(usersRepository, "findById")
      .mockResolvedValue({ ...user, id: 1 });
    jest
      .spyOn(destiniesRepository, "findById")
      .mockResolvedValue({ id: 1, imageLink: "", localization: "", name: "" });

    jest.spyOn(service, "checkDates").mockReturnValue(false);

    return expect(
      service.addTravel({
        userId: 1,
        destinyId: 1,
        startDate: dayjs(),
        endDate: dayjs().add(1, "day"),
      })
    ).rejects.toEqual(badRequest("Dates are invalid"));
  });
});
