-- CreateEnum
CREATE TYPE "PessoasTipo" AS ENUM ('SOCIO', 'EMPREGADO', 'MEDICO');

-- CreateTable
CREATE TABLE "ContasCorrente" (
    "Id" UUID NOT NULL,
    "Agencia" INTEGER NOT NULL,
    "AgenciaDigito" INTEGER NOT NULL,
    "Conta" INTEGER NOT NULL,
    "ContaDigito" INTEGER NOT NULL,
    "CodigoBanco" INTEGER NOT NULL,
    "ChavePix" TEXT,
    "TipoChavePix" INTEGER,
    "CriadoEm" TIMESTAMPTZ(6) NOT NULL,
    "ModificadoEm" TIMESTAMPTZ(6),
    "TitularId" UUID NOT NULL,

    CONSTRAINT "ContasCorrente_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "EmpresasMedicas" (
    "Id" UUID NOT NULL,
    "Cnpj" TEXT NOT NULL,
    "CriadoEm" TIMESTAMPTZ(6) NOT NULL,
    "ModificadoEm" TIMESTAMPTZ(6),
    "EnderecoId" UUID NOT NULL,

    CONSTRAINT "EmpresasMedicas_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Enderecos" (
    "Id" UUID NOT NULL,
    "Cep" TEXT NOT NULL,
    "Logradouro" TEXT NOT NULL,
    "Complemento" TEXT NOT NULL,
    "Bairro" TEXT NOT NULL,
    "Cidade" TEXT NOT NULL,
    "Estado" TEXT NOT NULL,
    "CriadoEm" TIMESTAMPTZ(6) NOT NULL,
    "ModificadoEm" TIMESTAMPTZ(6),

    CONSTRAINT "Enderecos_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Pessoas" (
    "Id" UUID NOT NULL,
    "Nome" TEXT NOT NULL,
    "Cpf" TEXT NOT NULL,
    "DataNascimento" TIMESTAMPTZ(6) NOT NULL,
    "CriadoEm" TIMESTAMPTZ(6) NOT NULL,
    "ModificadoEm" TIMESTAMPTZ(6),
    "Tipo" "PessoasTipo" NOT NULL,
    "EnderecoId" UUID,
    "Crm" TEXT,
    "EmpresaMedicaId" UUID,
    "Participacao" REAL,
    "Salario" DOUBLE PRECISION,
    "StatusAdmissao" INTEGER,

    CONSTRAINT "Pessoas_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmpresasMedicas_EnderecoId_key" ON "EmpresasMedicas"("EnderecoId");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoas_EnderecoId_key" ON "Pessoas"("EnderecoId");

-- AddForeignKey
ALTER TABLE "ContasCorrente" ADD CONSTRAINT "ContasCorrente_TitularId_fkey" FOREIGN KEY ("TitularId") REFERENCES "Pessoas"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmpresasMedicas" ADD CONSTRAINT "EmpresasMedicas_EnderecoId_fkey" FOREIGN KEY ("EnderecoId") REFERENCES "Enderecos"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoas" ADD CONSTRAINT "Pessoas_EnderecoId_fkey" FOREIGN KEY ("EnderecoId") REFERENCES "Enderecos"("Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoas" ADD CONSTRAINT "Pessoas_EmpresaMedicaId_fkey" FOREIGN KEY ("EmpresaMedicaId") REFERENCES "EmpresasMedicas"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
