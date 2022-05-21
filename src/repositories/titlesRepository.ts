import { prisma } from "../database.js";

async function list() {
  return await prisma.title.findMany();
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE titles CASCADE`;
}

export default { list, truncate };
