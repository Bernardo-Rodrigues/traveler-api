import { prisma } from "../database.js";

async function list() {
  return await prisma.avatar.findMany();
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE avatars CASCADE`;
}

export default { list, truncate };
