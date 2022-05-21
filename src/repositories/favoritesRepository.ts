import { prisma } from "../database.js";

async function add(userId: number, destinationId: number) {
  return await prisma.favorite.create({
    data: {
      userId,
      destinationId,
    },
  });
}

async function remove(userId: number, destinationId: number) {
  return await prisma.favorite.delete({
    where: {
      favoriteRelation: {
        userId,
        destinationId,
      },
    },
  });
}

async function find(userId: number, destinationName: string) {
  return await prisma.favorite.findFirst({
    where: {
      userId,
      AND: {
        destination: {
          name: destinationName,
        },
      },
    },
  });
}

async function listByUser(userId: number) {
  return await prisma.favorite.findMany({
    where: {
      userId,
    },
    include: {
      destination: {
        include: {
          localization: true,
        },
      },
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE avatars CASCADE`;
}

export default { add, truncate, find, remove, listByUser };
