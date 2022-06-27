import { AchievementUser } from ".prisma/client";
import { prisma } from "../database.js";

type AchievementUserInsertData = Omit<AchievementUser, "id">;

async function create(data: AchievementUserInsertData) {
  return await prisma.achievementUser.create({
    data,
  });
}

async function find(userId: string, destinationId: number) {
  return await prisma.achievementUser.findFirst({
    where: {
      userId,
      achievement: {
        destinationId,
      },
    },
  });
}

async function listByDestinationsAchievements(userId: string) {
  return await prisma.achievementUser.findMany({
    where: {
      userId,
      achievement: {
        count: null,
      },
    },
  });
}

async function listByUserId(userId: string) {
  return await prisma.achievementUser.findMany({
    where: {
      userId,
    },
    select: {
      achievement: true,
    },
  });
}
async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE achievements CASCADE`;
}

export default {
  create,
  truncate,
  find,
  listByUserId,
  listByDestinationsAchievements,
};
