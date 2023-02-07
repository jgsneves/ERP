import { BoundedMutationHelper } from "../BoundedMutationHelper";

describe("BoundedMutationHelper test suite", () => {
  it("employeePerformanceTableMutator should return correct function", () => {
    const mockedFunction = jest.fn();
    BoundedMutationHelper.setEmployeePerformanceTableMutator(mockedFunction);
    const mutator = BoundedMutationHelper.getEmployeePerformanceTableMutator();
    mutator();
    expect(mockedFunction).toBeCalledTimes(1);
  });

  it("employeeObservacoesMutator should return correct function", () => {
    const mockedFunction = jest.fn();
    BoundedMutationHelper.setEmployeeObservacoesMutator(mockedFunction);
    const mutator = BoundedMutationHelper.getEmployeeObservacoesMutator();
    mutator();
    expect(mockedFunction).toBeCalledTimes(1);
  });

  it("financialDataMutator should return correct function", () => {
    const mockedFunction = jest.fn();
    BoundedMutationHelper.setFinancialDataMutator(mockedFunction);
    const mutator = BoundedMutationHelper.getFinancialDataMutator();
    mutator();
    expect(mockedFunction).toBeCalledTimes(1);
  });

  it("employeePaymentsMutator should return correct function", () => {
    const mockedFunction = jest.fn();
    BoundedMutationHelper.setEmployeePaymentsMutator(mockedFunction);
    const mutator = BoundedMutationHelper.getEmployeePaymentsMutator();
    mutator();
    expect(mockedFunction).toBeCalledTimes(1);
  });
});
