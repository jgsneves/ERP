export class CurrencyFormat {
  /**
   * Retorna um valor em reais no formato R$ 00,00
   */
  public static formatNumberToBrazilianCurrency(value: number): string {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  /**
   * Diante de uma string no formato R$ 10.000,00 retorna seu valor em número
   */
  public static formatBrazilianCurrencyToNumber(currency: string): number {
    return Number(
      currency.replace("R$ ", "").replace(".", "").replace(",", ".")
    );
  }
}
