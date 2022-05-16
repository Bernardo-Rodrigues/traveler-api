/*
  Warnings:

  - The primary key for the `favorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `favorites` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,destinyId]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_destinyId_key" ON "favorites"("userId", "destinyId");
