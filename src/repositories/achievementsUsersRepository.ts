import { AchievementUser } from ".prisma/client";
import { prisma } from "../database.js";

type AchievementUserInsertData = Omit<AchievementUser, "id">;

async function create(data: AchievementUserInsertData) {
  return await prisma.achievementUser.create({
    data,
  });
}

async function find(userId: number, destinyId: number) {
  return await prisma.achievementUser.findFirst({
    where: {
      userId,
      achievement: {
        destinyId,
      },
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE achievements CASCADE`;
}

export default { create, truncate, find };
