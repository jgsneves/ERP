/*
  Warnings:

  - Added the required column `Email` to the `Pessoas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EstadoCivil` to the `Pessoas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Nacionalidade` to the `Pessoas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RG` to the `Pessoas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TelefonePessoal` to the `Pessoas` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoCivil" AS ENUM ('SOLTEIRO', 'CASADO', 'SEPARADO', 'DIVORCIADO', 'VIUVO');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "DocumentoTipo" ADD VALUE 'REGISTRO_GERAL';
ALTER TYPE "DocumentoTipo" ADD VALUE 'CARTEIRA_NACIONAL_HABILITACAO';

-- AlterTable
ALTER TABLE "Pessoas" ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "EstadoCivil" "EstadoCivil" NOT NULL,
ADD COLUMN     "Nacionalidade" TEXT NOT NULL,
ADD COLUMN     "PIS" TEXT,
ADD COLUMN     "RG" TEXT NOT NULL,
ADD COLUMN     "TelefonePessoal" TEXT NOT NULL,
ADD COLUMN     "TituloEleitor" TEXT;
