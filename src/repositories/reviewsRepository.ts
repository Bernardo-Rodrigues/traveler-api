import { prisma } from "../database.js";

async function listScores() {
  return await prisma.review.groupBy({
    by: ["destinationId"],
    _avg: {
      note: true,
    },
  });
}

async function find(destinationId: number) {
  return await prisma.review.aggregate({
    _avg: {
      note: true,
    },
    where: {
      destinationId,
    },
  });
}

async function create(data: any) {
  return await prisma.review.create({
    data,
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE reviews CASCADE`;
}

export default { listScores, truncate, find, create };
