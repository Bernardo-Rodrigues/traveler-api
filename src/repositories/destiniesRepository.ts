import { prisma } from "../database.js";

async function list() {
  return await prisma.destiny.findMany();
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE destinies CASCADE`;
}

export default { list, truncate };
