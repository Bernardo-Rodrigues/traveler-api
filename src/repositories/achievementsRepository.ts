import { prisma } from "../database.js";

async function findByDestination(destinationId: number) {
  return await prisma.achievement.findFirst({
    where: {
      destinationId,
    },
  });
}

async function findByCount(count: number) {
  return await prisma.achievement.findFirst({
    where: {
      count,
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE achievements CASCADE`;
}

export default { findByDestination, truncate, findByCount };
