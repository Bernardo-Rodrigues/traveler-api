import { Travel } from ".prisma/client";
import { prisma } from "../database.js";

export type TravelInsertData = Omit<Travel, "id">;

async function find(userId: number, destinyId: number) {
  return await prisma.travel.findFirst({
    where: {
      userId,
      destinyId,
    },
  });
}

async function add(data: TravelInsertData) {
  return await prisma.travel.create({
    data,
  });
}

async function truncate() {
  return await prisma.$executeRaw`TRUNCATE TABLE travels CASCADE`;
}

export default { truncate, find, add };
