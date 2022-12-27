/*
  Warnings:

  - The `StatusAdmissao` column on the `Pessoas` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusAdmissao" AS ENUM ('EMPREGADO', 'DEMITIDO');

-- AlterTable
ALTER TABLE "Pessoas" DROP COLUMN "StatusAdmissao",
ADD COLUMN     "StatusAdmissao" "StatusAdmissao";
