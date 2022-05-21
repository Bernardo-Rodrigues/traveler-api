-- AlterTable
ALTER TABLE "titles" ADD COLUMN     "count" INTEGER;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "titleId" SET DEFAULT 1;
