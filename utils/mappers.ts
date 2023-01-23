import { DocumentoTipo } from "@prisma/client";

export class Mapper {
  /**
   * mapDocumentType: recebe um enum do tipo DocumentoTipo e retorna o nome legível do documento
   */
  public static mapDocumentType(type: DocumentoTipo): string {
    switch (type) {
      case "CONTRATO_SOCIAL":
        return "Contrato social";
      case "NOTA_FISCAL":
        return "Nota fiscal";
      default:
        return type;
    }
  }
}
