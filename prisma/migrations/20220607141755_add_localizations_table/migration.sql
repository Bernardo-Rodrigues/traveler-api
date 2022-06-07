-- CreateTable
CREATE TABLE "localizations" (
    "id" SERIAL NOT NULL,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL,
    "destinationId" INTEGER NOT NULL,

    CONSTRAINT "localizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "localizations_destinationId_key" ON "localizations"("destinationId");

-- AddForeignKey
ALTER TABLE "localizations" ADD CONSTRAINT "localizations_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
