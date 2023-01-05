/*
  Warnings:

  - The `EmpresaTitularId` column on the `ContasCorrente` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[EmpresaTitularId]` on the table `ContasCorrente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ContasCorrente" DROP COLUMN "EmpresaTitularId",
ADD COLUMN     "EmpresaTitularId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "ContasCorrente_EmpresaTitularId_key" ON "ContasCorrente"("EmpresaTitularId");
