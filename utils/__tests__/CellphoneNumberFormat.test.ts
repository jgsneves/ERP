import { CellphoneNumberFormat } from "utils/CellphoneNumberFormat";

describe("CellphoneNumberFormat test suite", () => {
  it("should return cellphone", () => {
    const result = CellphoneNumberFormat.format("71991342115");
    expect(result).toBe("(71) 99134-2115");
  });
  it("should return only DDD", () => {
    const result = CellphoneNumberFormat.format("71");
    expect(result).toBe("71");
  });

  it("should return only DDD and first number", () => {
    const result = CellphoneNumberFormat.format("719");
    expect(result).toBe("(71) 9");
  });
});
