import { DocumentoTipo } from "@prisma/client";
import { EnumFormat } from "../EnumFormat";

describe("EnumFormat", () => {
  it("formatDocumentTypeEnum", () => {
    expect(
      EnumFormat.formatDocumentTypeEnum(
        DocumentoTipo.ALTERACAO_DE_CONTRATO_SOCIAL
      )
    ).toBe("alteração de contrato social");
    expect(EnumFormat.formatDocumentTypeEnum(DocumentoTipo.ATESTADO)).toBe(
      "atestado"
    );
    expect(
      EnumFormat.formatDocumentTypeEnum(
        DocumentoTipo.COMPROVANTE_CONTA_CORRENTE
      )
    ).toBe("comprovante de conta corrente");
  });

  it("formatEmpregadosPagamentosEnum", () => {
    expect(
      EnumFormat.formatEmpregadosPagamentosEnum("DECIMO_TERCEIRO_SALARIO")
    ).toBe("décimo terceiro salário");
    expect(EnumFormat.formatEmpregadosPagamentosEnum("REEMBOLSO")).toBe(
      "reembolso"
    );
    expect(EnumFormat.formatEmpregadosPagamentosEnum("SALARIO")).toBe(
      "salário"
    );
  });

  it("formatTipoChavePixEnum", () => {
    expect(EnumFormat.formatTipoChavePixEnum("CPF")).toBe("CPF");
    expect(EnumFormat.formatTipoChavePixEnum("EMAIL")).toBe("e-mail");
    expect(EnumFormat.formatTipoChavePixEnum("HASH")).toBe("chave aleatória");
  });

  it("formatDocumentoTipoByEmpregadoPagamentoTipo", () => {
    expect(
      EnumFormat.formatDocumentoTipoByEmpregadoPagamentoTipo(
        "DECIMO_TERCEIRO_SALARIO"
      )
    ).toBe("HOLERITE_ASSINADA");
    expect(
      EnumFormat.formatDocumentoTipoByEmpregadoPagamentoTipo("REEMBOLSO")
    ).toBe("RECIBO_DE_REEMBOLSO");
    expect(
      EnumFormat.formatDocumentoTipoByEmpregadoPagamentoTipo("SALARIO")
    ).toBe("HOLERITE_ASSINADA");
  });
});
