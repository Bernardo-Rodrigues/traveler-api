/*
  Warnings:

  - You are about to drop the column `localizationId` on the `destinies` table. All the data in the column will be lost.
  - You are about to drop the `localizations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `countryId` to the `destinies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "destinies" DROP CONSTRAINT "destinies_localizationId_fkey";

-- AlterTable
ALTER TABLE "destinies" DROP COLUMN "localizationId",
ADD COLUMN     "countryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "localizations";

-- CreateTable
CREATE TABLE "continents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "continents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "continentId" INTEGER NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "continents_name_key" ON "continents"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- AddForeignKey
ALTER TABLE "destinies" ADD CONSTRAINT "destinies_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_continentId_fkey" FOREIGN KEY ("continentId") REFERENCES "continents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
