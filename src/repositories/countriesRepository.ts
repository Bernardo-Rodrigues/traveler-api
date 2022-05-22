import { prisma } from "../database.js";

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE countries CASCADE`;
}

export default { truncate };
