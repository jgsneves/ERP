export class DateFormat {
  /**
   * Retorna a data-string no formato "yyyy-MM-dd"
   */
  public static getChakraDateFormat(date: Date): string {
    const getYear = date.toLocaleString("default", { year: "numeric" });
    const getMonth = date.toLocaleString("default", { month: "2-digit" });
    const getDay = date.toLocaleString("default", { day: "2-digit" });
    return getYear + "-" + getMonth + "-" + getDay;
  }

  /**
   * Transforma a data do Chakra (string) em Date
   */
  public static getDateTypeFromChakraString(dateString: string): Date {
    const [year, month, day] = dateString.split("-");
    return new Date(Number(year), Number(month), Number(day));
  }

  /**
   * Formata a datastring em data brasileira
   */
  public static formatISODateStringToLocale(isoDate: string) {
    return new Date(isoDate).toLocaleDateString();
  }
}
