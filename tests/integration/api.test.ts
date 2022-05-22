import supertest from "supertest";
import { describe, it, expect } from "@jest/globals";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import { createUser } from "../factories/usersFactory.js";
import seed from "../../prisma/seed.js";
import {
  Avatar,
  Destination,
  Favorite,
  Review,
  Title,
  Travel,
  User,
} from ".prisma/client";
import jwt from "jsonwebtoken";
import config from "../../src/config.js";
import TestsService from "../../src/services/TestsService.js";
import dayjs from "dayjs";

const testsService = new TestsService();

const agent = supertest(app);

interface SeedElements {
  avatar: Avatar;
  user: User;
  destination: Destination;
  knownDestination: Destination;
  review: Review;
  currentTravel: Travel;
  favorite: Favorite;
  title: Title;
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
    delete user.titleId;
    const response = await agent.post("/users/sign-up").send(user);
    const createdUsers = await prisma.user.findUnique({
      where: { email: user.email },
    });
    expect(response.status).toBe(201);
    expect(createdUsers).not.toBeNull();
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
    const response = await agent.get("/avatars?section=sign-up");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
  it("GET /destinations - should answer with status 200 and return an array of destinations given a valid auth token", async () => {
    const token = jwt.sign({}, config.secretJWT);
    const response = await agent
      .get("/destinations")
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
  it("GET /destinations/:name - should answer with status 200 and return a destination given a valid auth token and destination name", async () => {
    const userId = seedElements.user.id;
    const token = jwt.sign({ userId }, config.secretJWT);
    const knownDestinationName = seedElements.knownDestination.name;
    const response = await agent
      .get(`/destinations/${knownDestinationName}`)
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
  it("GET /destinations/favorites - should answer with status 200 and return an array of destinations given a valid auth token", async () => {
    const userId = seedElements.user.id;
    const token = jwt.sign({ userId }, config.secretJWT);
    const response = await agent
      .get(`/destinations/favorites`)
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
  it("GET /destinations/top - should answer with status 200 and return an array of destinations ordered by score given a valid auth token", async () => {
    const token = jwt.sign({}, config.secretJWT);
    const response = await agent
      .get(`/destinations/top`)
      .set("Authorization", token);
    const [first, second] = response.body;
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(first.score).toBeGreaterThanOrEqual(second.score);
  });
  it("POST /destinations/:id/favorite - should answer with status 201 and create a relation of favorite between the user and the destination given a valid auth token and destination id", async () => {
    const destinationId = seedElements.destination.id;
    const userId = seedElements.user.id;
    const token = jwt.sign({ userId }, config.secretJWT);
    const response = await agent
      .post(`/destinations/${destinationId}/favorite`)
      .set("Authorization", token);
    const favorite = await prisma.favorite.findUnique({
      where: {
        favoriteRelation: {
          userId,
          destinationId,
        },
      },
    });
    expect(favorite).not.toBeNull();
    expect(response.status).toBe(201);
  });
  it("POST /destinations/:id/unfavorite - should answer with status 200 and remove the relation of favorite between the user and the destination given a valid auth token and destination id", async () => {
    const destinationId = seedElements.destination.id;
    const userId = seedElements.user.id;
    const token = jwt.sign({ userId }, config.secretJWT);
    const response = await agent
      .post(`/destinations/${destinationId}/unfavorite`)
      .set("Authorization", token);
    const favorite = await prisma.favorite.findUnique({
      where: {
        favoriteRelation: {
          userId,
          destinationId,
        },
      },
    });
    expect(favorite).toBeNull();
    expect(response.status).toBe(200);
  });
  it("POST /travels - should answer with status 201 and create a travel given a valid auth token, destination id and dates", async () => {
    const destinationId = seedElements.destination.id;
    const userId = seedElements.user.id;
    const token = jwt.sign({ userId }, config.secretJWT);
    const body = {
      startDate: dayjs().add(1, "year"),
      endDate: dayjs().add(2, "year"),
      destinationId,
    };
    const response = await agent
      .post(`/travels`)
      .set("Authorization", token)
      .send(body);
    const travel = await prisma.travel.findFirst({
      where: {
        userId,
        destinationId,
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
  it("GET /destinations/:id/tips - should answer with status 200 and return an array of tips for the current user trip given a valid auth token", async () => {
    const token = jwt.sign({}, config.secretJWT);
    const response = await agent
      .get(`/destinations/${seedElements.destination.id}/tips`)
      .set("Authorization", token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
  it("GET /achievements/destinations/:id - should answer with status 201 and return a trip achievement given a valid auth token and destination id", async () => {
    const userId = seedElements.user.id;
    const token = jwt.sign({ userId }, config.secretJWT);
    const response = await agent
      .get(`/achievements/destinations/${seedElements.destination.id}`)
      .set("Authorization", token);
    expect(response.status).toBe(201);
    expect(response.body).not.toBeNull();
  });
});
