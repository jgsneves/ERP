import { render, screen } from "@testing-library/react";
import EmployeeObservacoes, { Observacoes } from "../EmployeeObservacoes";

jest.mock("swr", () => {
  const originalModule = jest.requireActual("swr");

  const response: Observacoes[] = [
    {
      Id: "1",
      Conteudo: "primeira mensagem",
      Data: "2023-02-07T15:52:43.219Z",
      EmpregadoId: "1",
    },
    {
      Id: "1",
      Conteudo: "segunda mensagem",
      Data: "2023-02-08T15:52:43.219Z",
      EmpregadoId: "1",
    },
  ];

  return {
    __esModule: true,
    ...originalModule,
    default: jest
      .fn()
      .mockReturnValueOnce({ isLoading: false, data: response })
      .mockReturnValue({ isLoading: false, data: [] }),
  };
});

describe("EmployeeObservacoes test suite", () => {
  it("should render a list of observations", () => {
    const { getByText, getByRole } = render(
      <EmployeeObservacoes employeeId="1" isActive={true} />
    );
    expect(getByText(/07\/02\/2023 \- primeira mensagem/i)).toBeInTheDocument();
    expect(getByText(/08\/02\/2023 \- segunda mensagem/i)).toBeInTheDocument();
    expect(getByText(/escreva uma nova observação/i)).toBeInTheDocument();
    expect(
      getByRole("button", {
        name: /salvar/i,
      })
    ).toBeInTheDocument();
  });

  it("should not render a list of observations", () => {
    const { getByText, getByRole } = render(
      <EmployeeObservacoes employeeId="1" isActive={true} />
    );
    expect(
      getByText(/não há observações para este empregado/i)
    ).toBeInTheDocument();
    expect(getByText(/escreva uma nova observação/i)).toBeInTheDocument();
    expect(
      getByRole("button", {
        name: /salvar/i,
      })
    ).toBeInTheDocument();
  });
});
