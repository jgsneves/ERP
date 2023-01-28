/*
  Warnings:

  - The values [CONTRATO_SOCIAL] on the enum `DocumentoTipo` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `EmpresaTitularId` on the `ContasCorrente` table. All the data in the column will be lost.
  - You are about to drop the column `TitularId` on the `ContasCorrente` table. All the data in the column will be lost.
  - You are about to drop the column `ContaCorrenteId` on the `EmpresasMedicas` table. All the data in the column will be lost.
  - Added the required column `NomeBanco` to the `ContasCorrente` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ModalidadeTrabalho" AS ENUM ('REMOTO', 'HIBRIDO', 'PRESENCIAL');

-- AlterEnum
BEGIN;
CREATE TYPE "DocumentoTipo_new" AS ENUM ('COMPROVANTE_ENDERECO', 'COMPROVANTE_CONTA_CORRENTE', 'COMPROVANTE_TRANSFERENCIA', 'CONTRATO_DE_TRABALHO_ASSINADO', 'CONTRATO_SOCIAL_ASSINADO', 'HOLERITE_ASSINADA', 'RECIBO_DE_VALE_DE_TRANSPORTE', 'ATESTADO', 'CRM', 'CONTRATO_PRESTACAO_DE_SERVICO', 'ALTERACAO_DE_CONTRATO_SOCIAL', 'NOTA_FISCAL', 'TFF', 'DAS');
ALTER TABLE "Documentos" ALTER COLUMN "Tipo" TYPE "DocumentoTipo_new" USING ("Tipo"::text::"DocumentoTipo_new");
ALTER TYPE "DocumentoTipo" RENAME TO "DocumentoTipo_old";
ALTER TYPE "DocumentoTipo_new" RENAME TO "DocumentoTipo";
DROP TYPE "DocumentoTipo_old";
COMMIT;

-- AlterEnum
ALTER TYPE "StatusAdmissao" ADD VALUE 'EXPERIENCIA';

-- DropForeignKey
ALTER TABLE "EmpresasMedicas" DROP CONSTRAINT "EmpresasMedicas_ContaCorrenteId_fkey";

-- DropForeignKey
ALTER TABLE "Pessoas" DROP CONSTRAINT "Pessoas_ContaCorrenteId_fkey";

-- DropIndex
DROP INDEX "ContasCorrente_EmpresaTitularId_key";

-- DropIndex
DROP INDEX "ContasCorrente_TitularId_key";

-- DropIndex
DROP INDEX "EmpresasMedicas_ContaCorrenteId_key";

-- AlterTable
ALTER TABLE "ContasCorrente" DROP COLUMN "EmpresaTitularId",
DROP COLUMN "TitularId",
ADD COLUMN     "EmpresaMedicaId" UUID,
ADD COLUMN     "NomeBanco" TEXT NOT NULL,
ADD COLUMN     "PessoaId" UUID;

-- AlterTable
ALTER TABLE "EmpresasMedicas" DROP COLUMN "ContaCorrenteId";

-- AlterTable
ALTER TABLE "Pessoas" ADD COLUMN     "ModalidadeTrabalho" "ModalidadeTrabalho";

-- CreateTable
CREATE TABLE "EmpregadosObservacoes" (
    "Id" UUID NOT NULL,
    "Data" TIMESTAMPTZ(6) NOT NULL,
    "Conteudo" TEXT NOT NULL,
    "EmpregadoId" UUID NOT NULL,

    CONSTRAINT "EmpregadosObservacoes_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmpregadosObservacoes_EmpregadoId_key" ON "EmpregadosObservacoes"("EmpregadoId");

-- AddForeignKey
ALTER TABLE "ContasCorrente" ADD CONSTRAINT "ContasCorrente_PessoaId_fkey" FOREIGN KEY ("PessoaId") REFERENCES "Pessoas"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContasCorrente" ADD CONSTRAINT "ContasCorrente_EmpresaMedicaId_fkey" FOREIGN KEY ("EmpresaMedicaId") REFERENCES "EmpresasMedicas"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpregadosObservacoes" ADD CONSTRAINT "EmpregadosObservacoes_EmpregadoId_fkey" FOREIGN KEY ("EmpregadoId") REFERENCES "Pessoas"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
