import { prisma } from "../database.js";

async function find(userId: number, destinyId: number) {
  return await prisma.travel.findFirst({
    where: {
      userId,
      destinyId,
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE avatars CASCADE`;
}

export default { truncate, find };
