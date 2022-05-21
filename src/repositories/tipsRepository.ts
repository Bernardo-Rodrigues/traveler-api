import { prisma } from "../database.js";

async function listTipsByDestination(destinationId: number) {
  return await prisma.tip.findMany({
    where: { destinationId },
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE tips CASCADE`;
}

export default { listTipsByDestination, truncate };
