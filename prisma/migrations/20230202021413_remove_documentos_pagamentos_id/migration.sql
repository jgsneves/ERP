/*
  Warnings:

  - You are about to drop the column `EmpregadoPagamentoComprovanteId` on the `Documentos` table. All the data in the column will be lost.
  - You are about to drop the column `EmpregadoPagamentoReciboId` on the `Documentos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Documentos" DROP COLUMN "EmpregadoPagamentoComprovanteId",
DROP COLUMN "EmpregadoPagamentoReciboId";
