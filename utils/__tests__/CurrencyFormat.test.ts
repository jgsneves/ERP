import { CurrencyFormat } from "../CurrencyFormat";

describe("CurrencyFormat test suite", () => {
  it("formatNumberToBrazilianCurrency should return brazilian currency", () => {
    const result = CurrencyFormat.formatNumberToBrazilianCurrency(0);
    expect(result).toBe("R$ 0,00");

    const result2 = CurrencyFormat.formatNumberToBrazilianCurrency(10);
    expect(result2).toBe("R$ 10,00");

    const result3 = CurrencyFormat.formatNumberToBrazilianCurrency(100);
    expect(result3).toBe("R$ 100,00");

    const result4 = CurrencyFormat.formatNumberToBrazilianCurrency(1000);
    expect(result4).toBe("R$ 1.000,00");
  });

  it("moneyMask should return only brazilian currency", () => {
    const result = CurrencyFormat.moneyMask("37b18f3e7");
    expect(result).toBe("R$ 3.718,37");

    const result2 = CurrencyFormat.moneyMask("00g7,00");
    expect(result2).toBe("R$ 7,00");

    const result3 = CurrencyFormat.moneyMask("9.10000");
    expect(result3).toBe("R$ 9.100,00");
  });

  it("formatStringToBrazilianCurrency should return brazilian currency", () => {
    const result = CurrencyFormat.formatStringToBrazilianCurrency("4000");
    expect(result).toBe("R$ 4.000,00");

    const result2 = CurrencyFormat.formatStringToBrazilianCurrency("200.25");
    expect(result2).toBe("R$ 200,25");
  });
});
