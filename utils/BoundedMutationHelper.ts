export class BoundedMutationHelper {
  private static employeePerformanceTableMutator: Function;
  private static employeeObservacoesMutator: Function;
  private static employeePaymentsMutator: Function;
  private static employeeDocumentosMutator: Function;

  private static financialDataMutator: Function;

  /**
   * Método para salvar o mutator de EmployeePaymentsMutator. Um mutator é uma função que refetch dados após um POST
   */
  public static setEmployeePaymentsMutator(mutation: Function): void {
    this.employeePaymentsMutator = mutation;
  }

  /**
   * Método para usar o mutator de EmployeePaymentsMutator. Um mutator é uma função que refetch dados após um POST
   */
  public static getEmployeePaymentsMutator(): Function {
    return this.employeePaymentsMutator;
  }

  /**
   * Método para salvar o mutator de EmployeePerformanceTable. Um mutator é uma função que refetch dados após um POST
   */
  public static setEmployeePerformanceTableMutator(mutation: Function): void {
    this.employeePerformanceTableMutator = mutation;
  }

  /**
   * Método para usar o mutator de EmployeePerformanceTable. Um mutator é uma função que refetch dados após um POST
   */
  public static getEmployeePerformanceTableMutator() {
    return this.employeePerformanceTableMutator;
  }

  /**
   * Método para salvar o mutator de EmployeeObservacoesMutator. Um mutator é uma função que refetch dados após um POST
   */
  public static setEmployeeObservacoesMutator(mutation: Function): void {
    this.employeeObservacoesMutator = mutation;
  }

  /**
   * Método para usar o mutator de EmployeeObservacoesMutator. Um mutator é uma função que refetch dados após um POST
   */
  public static getEmployeeObservacoesMutator() {
    return this.employeeObservacoesMutator;
  }

  /**
   * Método para salvar o mutator de EmployeeDocumentosMutator. Um mutator é uma função que refetch dados após um POST
   */
  public static setEmployeeDocumentosMutator(mutation: Function): void {
    this.employeeDocumentosMutator = mutation;
  }

  /**
   * Método para usar o mutator de EmployeeDocumentosMutator. Um mutator é uma função que refetch dados após um POST
   */
  public static getEmployeeDocumentosMutator() {
    return this.employeeDocumentosMutator;
  }

  /**
   * Método para salvar o mutator de FinancialDataMutator. Um mutator é uma função que refetch dados após um POST
   */
  public static setFinancialDataMutator(mutation: Function): void {
    this.financialDataMutator = mutation;
  }

  /**
   * Método para usar o mutator de FinancialDataMutator. Um mutator é uma função que refetch dados após um POST
   */
  public static getFinancialDataMutator() {
    return this.financialDataMutator;
  }
}
