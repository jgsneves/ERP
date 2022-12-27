/*
  Warnings:

  - The `TipoChavePix` column on the `ContasCorrente` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TipoChavePix" AS ENUM ('CPF', 'TELEFONE', 'EMAIL', 'HASH');

-- AlterTable
ALTER TABLE "ContasCorrente" DROP COLUMN "TipoChavePix",
ADD COLUMN     "TipoChavePix" "TipoChavePix";
