/*
  Warnings:

  - A unique constraint covering the columns `[ContaCorrenteId]` on the table `EmpresasMedicas` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "EmpresasMedicas" DROP CONSTRAINT "EmpresasMedicas_EnderecoId_fkey";

-- AlterTable
ALTER TABLE "ContasCorrente" ADD COLUMN     "EmpresaTitularId" TEXT;

-- AlterTable
ALTER TABLE "EmpresasMedicas" ADD COLUMN     "ContaCorrenteId" UUID,
ALTER COLUMN "EnderecoId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmpresasMedicas_ContaCorrenteId_key" ON "EmpresasMedicas"("ContaCorrenteId");

-- AddForeignKey
ALTER TABLE "EmpresasMedicas" ADD CONSTRAINT "EmpresasMedicas_EnderecoId_fkey" FOREIGN KEY ("EnderecoId") REFERENCES "Enderecos"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpresasMedicas" ADD CONSTRAINT "EmpresasMedicas_ContaCorrenteId_fkey" FOREIGN KEY ("ContaCorrenteId") REFERENCES "ContasCorrente"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
