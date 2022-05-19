import supertest from "supertest";
import { describe, it, expect } from "@jest/globals";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import { createUser } from "../factories/usersFactory.js";
import seed from "../../prisma/seed.js";
import {
  Avatar,
  Destiny,
  Favorite,
  Review,
  Travel,
  User,
} from ".prisma/client";
import jwt from "jsonwebtoken";
import config from "../../src/config.js";
import TestsService from "../../src/services/testsService.js";
import dayjs from "dayjs";

const testsService = new TestsService();

const agent = supertest(app);

interface SeedElements {
  avatar: Avatar;
  user: User;
  destiny: Destiny;
  knownDestiny: Destiny;
  review: Review;
  travel: Travel;
  favorite: Favorite;
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
    expect(response.body).not.toBeNull();
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
  it("GET /destinies/:name - should answer with status 200 and return a destination given a valid auth token and destination name", async () => {
    const token = jwt.sign({}, config.secretJWT);
    const knownDestinyName = seedElements.knownDestiny.name;
    const response = await agent
      .get(`/destinies/${knownDestinyName}`)
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
  it("GET /destinies/favorites - should answer with status 200 and return an array of destinations given a valid auth token", async () => {
    const userId = seedElements.user.id;
    const token = jwt.sign({ userId }, config.secretJWT);
    const response = await agent
      .get(`/destinies/favorites`)
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
  it("GET /destinies/top - should answer with status 200 and return an array of destinations ordered by score given a valid auth token", async () => {
    const token = jwt.sign({}, config.secretJWT);
    const response = await agent
      .get(`/destinies/top`)
      .set("Authorization", token);
    const [first, second] = response.body;
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(first.score).toBeGreaterThanOrEqual(second.score);
  });
  it("POST /destinies/:id/favorite - should answer with status 201 and create a relation of favorite between the user and the destination given a valid auth token and destination id", async () => {
    const destinyId = seedElements.destiny.id;
    const userId = seedElements.user.id;
    const token = jwt.sign({ userId }, config.secretJWT);
    const response = await agent
      .post(`/destinies/${destinyId}/favorite`)
      .set("Authorization", token);
    const favorite = await prisma.favorite.findUnique({
      where: {
        favoriteRelation: {
          userId,
          destinyId,
        },
      },
    });
    expect(favorite).not.toBeNull();
    expect(response.status).toBe(201);
  });
  it("POST /destinies/:id/unfavorite - should answer with status 200 and remove the relation of favorite between the user and the destination given a valid auth token and destination id", async () => {
    const destinyId = seedElements.destiny.id;
    const userId = seedElements.user.id;
    const token = jwt.sign({ userId }, config.secretJWT);
    const response = await agent
      .post(`/destinies/${destinyId}/unfavorite`)
      .set("Authorization", token);
    const favorite = await prisma.favorite.findUnique({
      where: {
        favoriteRelation: {
          userId,
          destinyId,
        },
      },
    });
    expect(favorite).toBeNull();
    expect(response.status).toBe(200);
  });
  it("POST /destinies/:id/travel - should answer with status 201 and create a travel given a valid auth token, destination id and dates", async () => {
    const destinyId = seedElements.destiny.id;
    const userId = seedElements.user.id;
    const token = jwt.sign({ userId }, config.secretJWT);
    const body = { startDate: dayjs(), endDate: dayjs().add(1, "day") };
    const response = await agent
      .post(`/destinies/${destinyId}/travel`)
      .set("Authorization", token)
      .send(body);
    const travel = await prisma.travel.findFirst({
      where: {
        userId,
        destinyId,
      },
    });
    expect(travel).not.toBeNull();
    expect(response.status).toBe(201);
  });
  it("GET /travels - should answer with status 200 and return an array of trips given a valid auth token", async () => {
    const userId = seedElements.user.id;
    const token = jwt.sign({ userId }, config.secretJWT);
    const response = await agent.get("/travels").set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
  it("GET /travels/:id/tips - should answer with status 200 and return an array of tips for the current user trip given a valid auth token", async () => {
    const token = jwt.sign({}, config.secretJWT);
    const response = await agent
      .get(`/travels/${seedElements.travel.id}/tips`)
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
  it("GET /achievements/destinies/:id - should answer with status 201 and return a trip achievement given a valid auth token and destiny id", async () => {
    const userId = seedElements.user.id;
    const token = jwt.sign({ userId }, config.secretJWT);
    const response = await agent
      .get(`/achievements/destinies/${seedElements.destiny.id}`)
      .set("Authorization", token);
    expect(response.status).toBe(201);
    expect(response.body).not.toBeNull();
  });
});
