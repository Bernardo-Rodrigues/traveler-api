import { prisma } from "../database.js";

async function list() {
  return await prisma.avatar.findMany();
}

export default { list };
