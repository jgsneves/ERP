import { render } from "@testing-library/react";
import EmployeePayments, { Pagamento } from "../EmployeePayments";

jest.mock("swr", () => {
  const originalModule = jest.requireActual("swr");

  const pagamentos: Pagamento[] = [
    {
      Id: "1",
      ComprovanteId: "2",
      Comprovante: {
        Id: "1",
        CriadoEm: new Date(),
        EmpresaMedicaId: null,
        ModificadoEm: null,
        Nome: "comprovate",
        PessoaId: "1",
        Tipo: "COMPROVANTE_TRANSFERENCIA",
        Url: "ble",
      },
      CriadoEm: "2023-02-07T18:14:22.668Z",
      EmpregadoId: "1",
      ModificadoEm: null,
      ReciboId: "2",
      Tipo: "DECIMO_TERCEIRO_SALARIO",
      Valor: "2000.00",
      Recibo: {
        Id: "1",
        CriadoEm: new Date(),
        EmpresaMedicaId: null,
        ModificadoEm: null,
        Nome: "comprovate",
        PessoaId: "1",
        Tipo: "HOLERITE_ASSINADA",
        Url: "ble",
      },
    },
  ];
  return {
    __esModule: true,
    ...originalModule,
    default: jest
      .fn()
      .mockReturnValueOnce({ isLoading: false, data: [] })
      .mockReturnValue({ isLoading: false, data: pagamentos }),
  };
});

describe("EmployeePayments test suite", () => {
  it("should render no payments", () => {
    const { getByText, getByLabelText, getByRole } = render(
      <EmployeePayments empregadoId="1" isActive salario={3000} />
    );
    expect(
      getByText(/não há pagamentos cadastrados para este empregado/i)
    ).toBeInTheDocument();
    expect(getByText(/valor \(r\$\)/i)).toBeInTheDocument();
    expect(getByText(/tipo de pagamento/i)).toBeInTheDocument();
    expect(
      getByLabelText(/arquivo do comprovante de transferência/i)
    ).toBeInTheDocument();
    expect(
      getByRole("button", {
        name: /salvar/i,
      })
    ).toBeInTheDocument();
  });

  it("should render a list of payments", () => {
    const { getByText, getByLabelText, getByRole } = render(
      <EmployeePayments empregadoId="1" isActive salario={3000} />
    );
    expect(
      getByRole("button", {
        name: /décimo terceiro salário efetuado em: 07\/02\/2023 valor: r\$ 2\.000,00/i,
      })
    ).toBeInTheDocument();
    expect(getByText(/valor \(r\$\)/i)).toBeInTheDocument();
    expect(getByText(/tipo de pagamento/i)).toBeInTheDocument();
    expect(
      getByLabelText(/arquivo do comprovante de transferência/i)
    ).toBeInTheDocument();
    expect(
      getByRole("button", {
        name: /salvar/i,
      })
    ).toBeInTheDocument();
  });
});
