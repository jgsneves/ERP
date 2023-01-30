/*
  Warnings:

  - You are about to drop the column `ContaCorrenteId` on the `Pessoas` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Pessoas_ContaCorrenteId_key";

-- AlterTable
ALTER TABLE "Pessoas" DROP COLUMN "ContaCorrenteId";
