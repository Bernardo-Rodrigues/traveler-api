import { prisma } from "../database.js";

async function list() {
  return await prisma.destination.findMany({
    include: {
      country: true,
    },
  });
}

async function getByName(name: string) {
  return await prisma.destination.findUnique({
    include: {
      descriptions: true,
      country: true,
    },
    where: {
      name,
    },
  });
}

async function findById(id: number) {
  return await prisma.destination.findUnique({
    where: {
      id,
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE destinations CASCADE`;
}

export default { list, getByName, truncate, findById };
