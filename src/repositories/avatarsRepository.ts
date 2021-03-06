import { prisma } from "../database.js";

async function list(count: number) {
  return await prisma.avatar.findMany({
    where: {
      OR: [
        {
          tripsCount: {
            equals: null,
          },
        },
        {
          tripsCount: {
            lte: count,
          },
        },
      ],
    },
  });
}

async function findById(id: number) {
  return await prisma.avatar.findUnique({
    where: {
      id,
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE avatars CASCADE`;
}

export default { list, truncate, findById };
