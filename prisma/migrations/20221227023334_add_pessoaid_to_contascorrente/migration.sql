/*
  Warnings:

  - A unique constraint covering the columns `[TitularId]` on the table `ContasCorrente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ContasCorrente" ADD COLUMN     "TitularId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "ContasCorrente_TitularId_key" ON "ContasCorrente"("TitularId");
