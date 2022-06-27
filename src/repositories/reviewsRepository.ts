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

async function findByUser(userId: string, destinationId: number) {
  return await prisma.review.findFirst({
    where: {
      destinationId,
      userId,
    },
  });
}

async function create(data: any) {
  return await prisma.review.upsert({
    where: {
      reviewRelation: {
        userId: data.userId,
        destinationId: data.destinationId,
      },
    },
    update: data,
    create: data,
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE reviews CASCADE`;
}

export default { listScores, truncate, find, create, findByUser };
