import { Travel } from ".prisma/client";
import { prisma } from "../database.js";

export type TravelInsertData = Omit<Travel, "id">;

async function listUpcomingTrips(userId: number) {
  return await prisma.travel.findMany({
    select: {
      startDate: true,
      endDate: true,
      destination: true,
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

async function findCurrentTrip(userId: number) {
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
      destination: {
        select: {
          name: true,
          imageLink: true,
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

export default { truncate, add, listUpcomingTrips, findCurrentTrip };
