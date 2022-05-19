import { prisma } from "../database.js";

async function listTipsByDestination(destinyId: number) {
  return await prisma.tip.findMany({
    where: { destinyId },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE tips CASCADE`;
}

export default { listTipsByDestination, truncate };
