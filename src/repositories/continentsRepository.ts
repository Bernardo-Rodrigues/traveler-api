import { prisma } from "../database.js";

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE continents CASCADE`;
}

export default { truncate };
