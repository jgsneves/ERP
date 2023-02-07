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
   * Máscara para ser usado em input de text que mostra dinheiro
   */
  public static moneyMask(value: string): string {
    value = value.replace(".", "").replace(",", "").replace(/\D/g, "");

    const options = { minimumFractionDigits: 2 };
    const result = new Intl.NumberFormat("pt-BR", options).format(
      parseFloat(value) / 100
    );

    return "R$ " + result;
  }

  /**
   * Diante de uma string que é um número, retorna seu valor em reais.
   */
  public static formatStringToBrazilianCurrency(stringNumber: string): string {
    return this.formatNumberToBrazilianCurrency(Number(stringNumber));
  }
}
