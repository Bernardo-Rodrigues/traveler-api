import { Travel } from ".prisma/client";
import { prisma } from "../database.js";

export type TravelInsertData = Omit<Travel, "id">;

async function listUpcomingTrips(userId: number) {
  return await prisma.travel.findMany({
    select: {
      startDate: true,
      endDate: true,
      destiny: true,
    },
    where: {
      userId,
      startDate: {
        gt: new Date(),
      },
    },
    orderBy: {
      startDate: "asc",
    },
  });
}

async function find(userId: number, destinyId: number) {
  return await prisma.travel.findFirst({
    where: {
      userId,
      destinyId,
    },
  });
}

async function findCurrentTravel(userId: number) {
  return await prisma.travel.findFirst({
    where: {
      userId,
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: new Date(),
      },
    },
    include: {
      destiny: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function add(data: TravelInsertData) {
  return await prisma.travel.create({
    data,
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE travels CASCADE`;
}

export default { truncate, find, add, listUpcomingTrips, findCurrentTravel };
