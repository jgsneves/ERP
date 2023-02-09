import { UploadFileHelper } from "../UploadFileHelper";

describe("UploadFileHelper test suite", () => {
  it("formatFileName", () => {
    const result = UploadFileHelper.formatFileName(
      "comprovante de residência de José da Silva "
    );
    expect(result).toBe("comprovante-de-residência-de-josé-da-silva");
  });
});
