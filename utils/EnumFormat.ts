import {
  DocumentoTipo,
  EmpregadosPagamentosTipo,
  TipoChavePix,
} from "@prisma/client";

export class EnumFormat {
  /**
   * Formata o valor do enum DocumentoTipo em string
   */
  public static formatDocumentTypeEnum(documentType: DocumentoTipo): string {
    const literal: { [key in DocumentoTipo]: string } = {
      ALTERACAO_DE_CONTRATO_SOCIAL: "alteração de contrato social",
      ATESTADO: "atestado",
      COMPROVANTE_CONTA_CORRENTE: "comprovante de conta corrente",
      COMPROVANTE_ENDERECO: "comprovante de endereço",
      COMPROVANTE_TRANSFERENCIA: "comprovante de transferência",
      CONTRATO_DE_TRABALHO_ASSINADO: "contrato de trabalho assinado",
      CONTRATO_PRESTACAO_DE_SERVICO: "contrato de prestação de serviço",
      CONTRATO_SOCIAL_ASSINADO: "contrato social assinado",
      CRM: "CRM",
      DAS: "DAS",
      HOLERITE_ASSINADA: "holerite assinada",
      NOTA_FISCAL: "nota fiscal",
      RECIBO_DE_VALE_DE_TRANSPORTE: "recibo de vale de transporte",
      TFF: "TFF",
      RECIBO_DE_REEMBOLSO: "recibo de reembolso",
      FOLHA_DE_PONTO_ASSINADA: "folha de ponto assinada",
      CARTEIRA_NACIONAL_HABILITACAO: "carteira nacional de habilitação",
      REGISTRO_GERAL: "registro geral",
    };
    return literal[documentType];
  }

  /**
   * Formata o valor do enum EmpregadosPagamentosTipo em string
   */
  public static formatEmpregadosPagamentosEnum(
    empregadoPagamentoTipo: EmpregadosPagamentosTipo
  ): string {
    const literal: { [key in EmpregadosPagamentosTipo]: string } = {
      DECIMO_TERCEIRO_SALARIO: "décimo terceiro salário",
      REEMBOLSO: "reembolso",
      SALARIO: "salário",
      VALE_DE_TRANSPORTE: "vale de transporte",
    };
    return literal[empregadoPagamentoTipo];
  }

  /**
   * Formata o valor do enum TipoChavePix em string
   */
  public static formatTipoChavePixEnum(tipoChavePix: TipoChavePix): string {
    const literal: { [key in TipoChavePix]: string } = {
      CPF: "CPF",
      EMAIL: "e-mail",
      HASH: "chave aleatória",
      TELEFONE: "telefone",
    };
    return literal[tipoChavePix];
  }

  /**
   * Formata um EmpregadoPagamentoTipo em um DocumentoTipo
   */
  public static formatDocumentoTipoByEmpregadoPagamentoTipo(
    empregadoPagamentoTipo: EmpregadosPagamentosTipo
  ): DocumentoTipo {
    const literal: { [key in EmpregadosPagamentosTipo]: DocumentoTipo } = {
      DECIMO_TERCEIRO_SALARIO: "HOLERITE_ASSINADA",
      REEMBOLSO: "RECIBO_DE_REEMBOLSO",
      SALARIO: "HOLERITE_ASSINADA",
      VALE_DE_TRANSPORTE: "RECIBO_DE_VALE_DE_TRANSPORTE",
    };
    return literal[empregadoPagamentoTipo];
  }
}
