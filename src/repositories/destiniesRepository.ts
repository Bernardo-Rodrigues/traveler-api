import { prisma } from "../database.js";

async function list() {
  return await prisma.destiny.findMany();
}

async function find(name: string) {
  return await prisma.destiny.findUnique({
    include: {
      descriptions: true,
    },
    where: {
      name,
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE destinies CASCADE`;
}

export default { list, find, truncate };
