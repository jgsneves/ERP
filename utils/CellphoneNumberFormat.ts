export class CellphoneNumberFormat {
  /**
   * Máscara para formatar uma string em um telefone celular.
   */
  public static format(cellphoneNumber: string) {
    let value = cellphoneNumber;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  }
}
