/*
  Warnings:

  - You are about to drop the column `description` on the `destinies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "destinies" DROP COLUMN "description";

-- CreateTable
CREATE TABLE "descriptions" (
    "id" SERIAL NOT NULL,
    "destinyId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "descriptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "descriptions" ADD CONSTRAINT "descriptions_destinyId_fkey" FOREIGN KEY ("destinyId") REFERENCES "destinies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
