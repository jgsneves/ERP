/*
  Warnings:

  - You are about to drop the column `TitularId` on the `ContasCorrente` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ContaCorrenteId]` on the table `Pessoas` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ContasCorrente" DROP CONSTRAINT "ContasCorrente_TitularId_fkey";

-- AlterTable
ALTER TABLE "ContasCorrente" DROP COLUMN "TitularId";

-- AlterTable
ALTER TABLE "Pessoas" ADD COLUMN     "ContaCorrenteId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Pessoas_ContaCorrenteId_key" ON "Pessoas"("ContaCorrenteId");

-- AddForeignKey
ALTER TABLE "Pessoas" ADD CONSTRAINT "Pessoas_ContaCorrenteId_fkey" FOREIGN KEY ("ContaCorrenteId") REFERENCES "ContasCorrente"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
