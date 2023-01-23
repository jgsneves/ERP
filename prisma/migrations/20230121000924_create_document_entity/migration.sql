-- CreateEnum
CREATE TYPE "DocumentoTipo" AS ENUM ('CONTRATO_SOCIAL', 'NOTA_FISCAL', 'TFF', 'DAS');

-- CreateTable
CREATE TABLE "Documentos" (
    "Id" UUID NOT NULL,
    "Nome" TEXT NOT NULL,
    "Tipo" "DocumentoTipo" NOT NULL,
    "Url" TEXT NOT NULL,
    "PessoaId" UUID,
    "EmpresaMedicaId" UUID,

    CONSTRAINT "Documentos_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Documentos" ADD CONSTRAINT "Documentos_PessoaId_fkey" FOREIGN KEY ("PessoaId") REFERENCES "Pessoas"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documentos" ADD CONSTRAINT "Documentos_EmpresaMedicaId_fkey" FOREIGN KEY ("EmpresaMedicaId") REFERENCES "EmpresasMedicas"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
