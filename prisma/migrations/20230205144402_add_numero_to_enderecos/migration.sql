/*
  Warnings:

  - Added the required column `Numero` to the `Enderecos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enderecos" ADD COLUMN     "Numero" INTEGER NOT NULL;
