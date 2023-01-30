import { DocumentoTipo, TipoChavePix } from "@prisma/client";

export class EnumFormat {
  /**
   * Formata o valor do enum DocumentoTipo em string
   */
  public static formatDocumentTypeEnum(documentType: DocumentoTipo): string {
    const literal: { [key in DocumentoTipo]: string } = {
      ALTERACAO_DE_CONTRATO_SOCIAL: "Alteração de contrato social",
      ATESTADO: "Atestado",
      COMPROVANTE_CONTA_CORRENTE: "Comprovante de conta corrente",
      COMPROVANTE_ENDERECO: "Comprovante de endereço",
      COMPROVANTE_TRANSFERENCIA: "Comprovante de transferência",
      CONTRATO_DE_TRABALHO_ASSINADO: "Contrato de trabalho assinado",
      CONTRATO_PRESTACAO_DE_SERVICO: "Contrato de prestação de serviço",
      CONTRATO_SOCIAL_ASSINADO: "Contrato social assinado",
      CRM: "CRM",
      DAS: "DAS",
      HOLERITE_ASSINADA: "Holerite assinada",
      NOTA_FISCAL: "Nota fiscal",
      RECIBO_DE_VALE_DE_TRANSPORTE: "Recibo de vale de transporte",
      TFF: "TFF",
    };
    return literal[documentType];
  }
}
