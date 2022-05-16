import { jest, describe, it, expect } from "@jest/globals";
import destiniesRepository from "../../src/repositories/destiniesRepository.js";
import { notFound } from "../../src/errors/index";
import destinesService from "../../src/services/destinesService.js";
import { prisma } from "../../src/database.js";

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
    jest.spyOn(destiniesRepository, "find").mockResolvedValue(null);

    expect(service.find("destiny")).rejects.toEqual(
      notFound("Destiny not found")
    );
  });
});
