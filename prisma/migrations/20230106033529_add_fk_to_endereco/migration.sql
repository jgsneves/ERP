/*
  Warnings:

  - A unique constraint covering the columns `[EmpresaMedicaId]` on the table `Enderecos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[PessoaId]` on the table `Enderecos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Enderecos" ADD COLUMN     "EmpresaMedicaId" UUID,
ADD COLUMN     "PessoaId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "Enderecos_EmpresaMedicaId_key" ON "Enderecos"("EmpresaMedicaId");

-- CreateIndex
CREATE UNIQUE INDEX "Enderecos_PessoaId_key" ON "Enderecos"("PessoaId");
