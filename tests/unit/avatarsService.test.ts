import { jest, describe, it, expect } from "@jest/globals";
import avatarsRepository from "../../src/repositories/avatarsRepository.js";
import avatarsService from "../../src/services/AvatarsService.js";
import { prisma } from "../../src/database.js";

const service = new avatarsService();

describe("#Avatars Service - test suit for edge processing", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("#list - should throw an error if there is no avatars registered", () => {
    jest.spyOn(avatarsRepository, "list").mockResolvedValue([]);

    return expect(service.list("sign-up", "")).rejects.toEqual(
      Error("No avatars found")
    );
  });
});
