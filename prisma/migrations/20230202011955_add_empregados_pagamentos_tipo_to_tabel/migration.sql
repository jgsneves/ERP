/*
  Warnings:

  - Added the required column `Tipo` to the `EmpregadosPagamentos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmpregadosPagamentosTipo" AS ENUM ('SALARIO', 'DECIMO_TERCEIRO_SALARIO', 'VALE_DE_TRANSPORTE', 'REEMBOLSO');

-- AlterTable
ALTER TABLE "EmpregadosPagamentos" ADD COLUMN     "Tipo" "EmpregadosPagamentosTipo" NOT NULL;
