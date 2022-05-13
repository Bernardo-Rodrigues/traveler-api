import supertest from "supertest";
import { describe, it, expect } from "@jest/globals";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import { createUser, insertUser } from "../factories/usersFactory.js";
import seed from "../../prisma/seed.js";
import { Avatar } from ".prisma/client";

const agent = supertest(app);

interface SeedElements {
  avatar: Avatar;
}

let seedElements: SeedElements;

describe("#Api - test suit for api integrations", () => {
  beforeAll(async () => {
    seedElements = await seed();
  });
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`;
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("POST /users/sign-up - should create a new user and answer with status 201", async () => {
    const user = createUser(seedElements.avatar.id);
    const response = await agent.post("/users/sign-up").send(user);
    const createdUsers = await prisma.user.findUnique({
      where: { email: user.email },
    });
    expect(createdUsers).not.toBeNull();
    expect(response.status).toBe(201);
  });
  it("POST /users/sign-in - should answer with status 200 and return a token when credentials are valid", async () => {
    const user = createUser();
    await insertUser(user);
    const response = await agent
      .post("/users/sign-in")
      .send({ email: user.email, password: user.password });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
