import { prisma } from "../database.js";

async function add(userId: number, destinyId: number) {
  return await prisma.favorite.create({
    data: {
      userId,
      destinyId,
    },
  });
}

async function remove(userId: number, destinyId: number) {
  return await prisma.favorite.delete({
    where: {
      favoriteRelation: {
        userId,
        destinyId,
      },
    },
  });
}

async function find(userId: number, destinationName: string) {
  return await prisma.favorite.findFirst({
    where: {
      userId,
      AND: {
        destiny: {
          name: destinationName,
        },
      },
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE avatars CASCADE`;
}

export default { add, truncate, find, remove };
