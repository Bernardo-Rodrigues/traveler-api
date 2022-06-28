import { Travel } from ".prisma/client";
import dayjs from "dayjs";
import { prisma } from "../database.js";

export type TravelInsertData = Omit<Travel, "id">;

async function listUpcomingTrips(userId: string) {
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

async function findCurrentTrip(userId: string) {
  return await prisma.travel.findFirst({
    where: {
      userId,
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: dayjs().subtract(1, "day").format() as unknown as Date,
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

async function findByDate(userId: string, startDate: Date, endDate: Date) {
  return await prisma.travel.findFirst({
    where: {
      userId,
      OR: [
        {
          AND: [
            {
              startDate: {
                lte: startDate,
              },
              endDate: {
                gt: startDate,
              },
            },
          ],
        },
        {
          AND: [
            {
              startDate: {
                lt: endDate,
              },
              endDate: {
                gte: endDate,
              },
            },
          ],
        },
        {
          AND: [
            {
              startDate: {
                gte: startDate,
              },
              endDate: {
                lte: endDate,
              },
            },
          ],
        },
      ],
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

export default {
  truncate,
  add,
  listUpcomingTrips,
  findCurrentTrip,
  findByDate,
};
