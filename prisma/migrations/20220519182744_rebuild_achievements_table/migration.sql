/*
  Warnings:

  - You are about to drop the `accumulators` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trips` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[destinyId]` on the table `achievements` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[count]` on the table `achievements` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "accumulators" DROP CONSTRAINT "accumulators_achievementId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_achievementId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_destinyId_fkey";

-- AlterTable
ALTER TABLE "achievements" ADD COLUMN     "count" INTEGER,
ADD COLUMN     "destinyId" INTEGER;

-- DropTable
DROP TABLE "accumulators";

-- DropTable
DROP TABLE "trips";

-- CreateIndex
CREATE UNIQUE INDEX "achievements_destinyId_key" ON "achievements"("destinyId");

-- CreateIndex
CREATE UNIQUE INDEX "achievements_count_key" ON "achievements"("count");
