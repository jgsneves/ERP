export class BoundedMutationHelper {
  private static employeePerformanceTableMutator: Function;
  private static employeeObservacoesMutator: Function;
  private static financialDataMutator: Function;

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
