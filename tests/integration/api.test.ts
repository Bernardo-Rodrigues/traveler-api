import supertest from "supertest";
import { describe, it, expect } from "@jest/globals";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import { createUser } from "../factories/usersFactory.js";
import seed from "../../prisma/seed.js";
import { Avatar, Destiny, User } from ".prisma/client";
import jwt from "jsonwebtoken";
import config from "../../src/config.js";
import TestsService from "../../src/services/testsService.js";

const testsService = new TestsService();

const agent = supertest(app);

interface SeedElements {
  avatar: Avatar;
  user: User;
  destiny: Destiny;
}

let seedElements: SeedElements;

describe("#Api - test suit for api integrations", () => {
  beforeAll(async () => {
    await testsService.trucanteAll();
    seedElements = await seed();
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
    const user = seedElements.user;
    const response = await agent
      .post("/users/sign-in")
      .send({ email: user.email, password: user.password });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("imageLink");
    expect(response.body).toHaveProperty("username");
  });
  it("GET /avatars - should answer with status 200 and return an array of avatars", async () => {
    const response = await agent.get("/avatars");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
  it("GET /destinies - should answer with status 200 and return an array of destinies given a valid auth token", async () => {
    const token = jwt.sign({}, config.secretJWT);
    const response = await agent.get("/destinies").set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
