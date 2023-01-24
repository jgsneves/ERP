/*
  Warnings:

  - Added the required column `CriadoEm` to the `Documentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Documentos" ADD COLUMN     "CriadoEm" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "ModificadoEm" TIMESTAMPTZ(6);
