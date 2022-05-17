import { prisma } from "../database.js";

async function listScores() {
  return await prisma.review.groupBy({
    by: ["destinyId"],
    _avg: {
      note: true,
    },
  });
}

async function find(destinyId: number) {
  return await prisma.review.aggregate({
    _avg: {
      note: true,
    },
    where: {
      destinyId,
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE reviews CASCADE`;
}

export default { listScores, truncate, find };
