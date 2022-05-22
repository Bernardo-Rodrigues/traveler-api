import { prisma } from "../database.js";

async function list() {
  return await prisma.continent.findMany();
}

async function findByName(name: string) {
  return await prisma.continent.findUnique({
    where: {
      name,
    },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE continents CASCADE`;
}

export default { list, truncate, findByName };
