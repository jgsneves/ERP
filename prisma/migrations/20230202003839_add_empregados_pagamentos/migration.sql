-- AlterTable
ALTER TABLE "Documentos" ADD COLUMN     "EmpregadoPagamentoComprovanteId" UUID,
ADD COLUMN     "EmpregadoPagamentoReciboId" UUID;

-- CreateTable
CREATE TABLE "EmpregadosPagamentos" (
    "Id" UUID NOT NULL,
    "EmpregadoId" UUID NOT NULL,
    "Valor" DOUBLE PRECISION NOT NULL,
    "CriadoEm" TIMESTAMPTZ(6) NOT NULL,
    "ModificadoEm" TIMESTAMPTZ(6),
    "ComprovanteId" UUID NOT NULL,
    "ReciboId" UUID,

    CONSTRAINT "EmpregadosPagamentos_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmpregadosPagamentos_ComprovanteId_key" ON "EmpregadosPagamentos"("ComprovanteId");

-- CreateIndex
CREATE UNIQUE INDEX "EmpregadosPagamentos_ReciboId_key" ON "EmpregadosPagamentos"("ReciboId");

-- AddForeignKey
ALTER TABLE "EmpregadosPagamentos" ADD CONSTRAINT "EmpregadosPagamentos_EmpregadoId_fkey" FOREIGN KEY ("EmpregadoId") REFERENCES "Pessoas"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpregadosPagamentos" ADD CONSTRAINT "EmpregadosPagamentos_ComprovanteId_fkey" FOREIGN KEY ("ComprovanteId") REFERENCES "Documentos"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpregadosPagamentos" ADD CONSTRAINT "EmpregadosPagamentos_ReciboId_fkey" FOREIGN KEY ("ReciboId") REFERENCES "Documentos"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
