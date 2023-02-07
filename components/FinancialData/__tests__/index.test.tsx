import { ContasCorrente } from "@prisma/client";
import { render, screen } from "@testing-library/react";
import FinancialData from "..";

jest.mock("swr", () => {
  const originalModule = jest.requireActual("swr");

  const contas: ContasCorrente[] = [
    {
      Agencia: 300,
      AgenciaDigito: 2,
      ChavePix: "teste@gmail.com",
      CodigoBanco: 133,
      Conta: 100,
      ContaDigito: 0,
      CriadoEm: new Date(),
      EmpresaMedicaId: null,
      Id: "1",
      ModificadoEm: null,
      NomeBanco: "Banco do Brasil SA",
      PessoaId: "1",
      TipoChavePix: "EMAIL",
    },
    {
      Agencia: 300,
      AgenciaDigito: 2,
      ChavePix: "outro-email@gmail.com",
      CodigoBanco: 133,
      Conta: 100,
      ContaDigito: 0,
      CriadoEm: new Date(),
      EmpresaMedicaId: null,
      Id: "1",
      ModificadoEm: null,
      NomeBanco: "Santander SA",
      PessoaId: "1",
      TipoChavePix: "EMAIL",
    },
  ];

  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      isLoading: false,
      data: contas,
    }),
  };
});

describe("FinancialData test suite", () => {
  it("should render accounts and form", () => {
    const { getByText, getAllByText } = render(
      <FinancialData isActive={true} />
    );
    const conta1 = getByText(/conta corrente nº 1/i);
    const conta2 = getByText(/conta corrente nº 2/i);

    const codigoBanco = getAllByText(/código do banco:/i);
    const nomeBanco = getAllByText(/nome do banco:/i);
    const agencia = getAllByText(/agência:/i);
    const digitoAgencia = getAllByText(/dígito da agência:/i);
    const contaCorrente = getAllByText(/conta corrente:/i);
    const digitoCC = getAllByText(/dígito da conta:/i);
    const chavePix = getAllByText(/chave pix:/i);
    const tipoChavePix = getAllByText(/tipo de chave pix:/i);
    const salvar = getByText("salvar");
    [
      conta1,
      conta2,
      codigoBanco,
      nomeBanco,
      agencia,
      digitoAgencia,
      contaCorrente,
      digitoCC,
      chavePix,
      tipoChavePix,
      salvar,
    ].forEach((element) => expect(element).toBeTruthy());
  });
});
