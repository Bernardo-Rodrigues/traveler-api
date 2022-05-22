/*
  Warnings:

  - You are about to drop the `lacalizations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "destinies" DROP CONSTRAINT "destinies_localizationId_fkey";

-- DropTable
DROP TABLE "lacalizations";

-- CreateTable
CREATE TABLE "localizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "localizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "localizations_name_key" ON "localizations"("name");

-- AddForeignKey
ALTER TABLE "destinies" ADD CONSTRAINT "destinies_localizationId_fkey" FOREIGN KEY ("localizationId") REFERENCES "localizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
