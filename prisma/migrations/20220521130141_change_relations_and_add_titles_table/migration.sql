/*
  Warnings:

  - You are about to drop the column `destinyId` on the `achievements` table. All the data in the column will be lost.
  - The primary key for the `achievementsUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `achievementsUsers` table. All the data in the column will be lost.
  - You are about to drop the column `localization` on the `destinies` table. All the data in the column will be lost.
  - You are about to drop the column `destinyId` on the `favorites` table. All the data in the column will be lost.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `destinyId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `destinyId` on the `tips` table. All the data in the column will be lost.
  - You are about to drop the column `destinyId` on the `travels` table. All the data in the column will be lost.
  - You are about to drop the `descriptions` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[destinationId]` on the table `achievements` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,achievementId]` on the table `achievementsUsers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,destinationId]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,destinationId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `localizationId` to the `destinies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId` to the `favorites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId` to the `tips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId` to the `travels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "descriptions" DROP CONSTRAINT "descriptions_destinyId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_destinyId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_destinyId_fkey";

-- DropForeignKey
ALTER TABLE "tips" DROP CONSTRAINT "tips_destinyId_fkey";

-- DropForeignKey
ALTER TABLE "travels" DROP CONSTRAINT "travels_destinyId_fkey";

-- DropIndex
DROP INDEX "achievements_destinyId_key";

-- DropIndex
DROP INDEX "favorites_userId_destinyId_key";

-- AlterTable
ALTER TABLE "achievements" DROP COLUMN "destinyId",
ADD COLUMN     "destinationId" INTEGER;

-- AlterTable
ALTER TABLE "achievementsUsers" DROP CONSTRAINT "achievementsUsers_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "avatars" ADD COLUMN     "tripsCount" INTEGER;

-- AlterTable
ALTER TABLE "destinies" DROP COLUMN "localization",
ADD COLUMN     "localizationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "destinyId",
ADD COLUMN     "destinationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
DROP COLUMN "destinyId",
DROP COLUMN "id",
ADD COLUMN     "destinationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tips" DROP COLUMN "destinyId",
ADD COLUMN     "destinationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "travels" DROP COLUMN "destinyId",
ADD COLUMN     "destinationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "titleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "descriptions";

-- CreateTable
CREATE TABLE "titles" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lacalizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "lacalizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" SERIAL NOT NULL,
    "destinationId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "destinations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "titles_text_key" ON "titles"("text");

-- CreateIndex
CREATE UNIQUE INDEX "lacalizations_name_key" ON "lacalizations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "achievements_destinationId_key" ON "achievements"("destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "achievementsUsers_userId_achievementId_key" ON "achievementsUsers"("userId", "achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_destinationId_key" ON "favorites"("userId", "destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_userId_destinationId_key" ON "reviews"("userId", "destinationId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "titles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travels" ADD CONSTRAINT "travels_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destinies" ADD CONSTRAINT "destinies_localizationId_fkey" FOREIGN KEY ("localizationId") REFERENCES "lacalizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destinations" ADD CONSTRAINT "destinations_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tips" ADD CONSTRAINT "tips_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
