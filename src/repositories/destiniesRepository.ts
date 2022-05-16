import { prisma } from "../database.js";

async function list() {
  return await prisma.destiny.findMany();
}

async function get(name: string) {
  return await prisma.destiny.findUnique({
    include: {
      descriptions: true,
    },
    where: {
      name,
    },
  });
}

async function findById(id: number) {
  return await prisma.destiny.findUnique({
    where: {
      id,
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE destinies CASCADE`;
}

export default { list, get, truncate, findById };
