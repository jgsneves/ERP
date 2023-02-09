import { DateFormat } from "../DateFormat";

describe("DateFormat", () => {
  describe("getChakraDateFormat", () => {
    it('should return a date string in the format "yyyy-MM-dd"', () => {
      const date = new Date(2022, 11, 31);
      const result = DateFormat.getChakraDateFormat(date);
      expect(result).toBe("2022-12-31");
    });
  });

  describe("getDateTypeFromChakraString", () => {
    it("should return a Date object from a Chakra date string", () => {
      const dateString = "2022-12-31";
      const result = DateFormat.getDateTypeFromChakraString(dateString);
      expect(result).toEqual(new Date(2022, 12, 31));
    });
  });

  describe("formatISODateStringToLocale", () => {
    it("should return a formatted date string from an ISO date string", () => {
      const isoDate = "2022-12-31T00:00:00.000Z";
      const result = DateFormat.formatISODateStringToLocale(isoDate);
      expect(result).toBeTruthy();
    });
  });

  describe("formatDateToLocaleString", () => {
    it("should return a formatted date string from a Date object", () => {
      const date = new Date(2022, 11, 31);
      const result = DateFormat.formatDateToLocaleString(date);
      expect(result).toBeTruthy();
    });
  });
});
