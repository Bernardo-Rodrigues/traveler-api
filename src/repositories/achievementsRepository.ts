import { prisma } from "../database.js";

async function find(destinyId: number) {
  return await prisma.achievement.findFirst({
    where: {
      destinyId,
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE achievements CASCADE`;
}

export default { find, truncate };
