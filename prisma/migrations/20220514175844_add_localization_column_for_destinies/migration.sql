/*
  Warnings:

  - Added the required column `localization` to the `destinies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "destinies" ADD COLUMN     "localization" TEXT NOT NULL;
