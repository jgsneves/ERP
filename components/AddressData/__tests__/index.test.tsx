import { fireEvent, render } from "@testing-library/react";
import AddressData from "..";
import { Enderecos } from "@prisma/client";

jest.mock("swr", () => {
  const originalModule = jest.requireActual("swr");
  const address: Enderecos = {
    Bairro: "Das Rosas",
    Cep: "893287",
    Cidade: "Salvador",
    Complemento: "casa de cima",
    CriadoEm: new Date(),
    EmpresaMedicaId: null,
    Estado: "BA",
    Id: "1",
    Logradouro: "Rua de cima",
    ModificadoEm: null,
    Numero: 20,
    PessoaId: "1",
  };
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      isLoading: false,
      data: address,
    }),
  };
});

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn(),
  };
});

describe("AddressData index test suite", () => {
  it("should render address", () => {
    const { getByText } = render(
      <AddressData enderecoId="2020" isActive={true} />
    );

    const cep = getByText(/cep: 893287/i);
    const logradouro = getByText(/logradouro: rua de cima/i);
    const numero = getByText(/número: 20/i);
    const complemento = getByText(/complemento: casa de cima/i);
    const bairro = getByText(/bairro: das rosas/i);
    const cidade = getByText(/cidade: salvador/i);
    const estado = getByText(/estado: ba/i);
    [cep, logradouro, numero, complemento, bairro, cidade, estado].forEach(
      (element) => expect(element).toBeInTheDocument()
    );
  });

  it("should render Address form", () => {
    const { getByText } = render(
      <AddressData isActive={true} enderecoId={null} />
    );
    const cep = getByText(/cep \(apenas os números\):/i);
    const logradouro = getByText(/logradouro:/i);
    const numero = getByText(/número:/i);
    const bairro = getByText(/bairro:/i);
    const cidade = getByText(/cidade:/i);
    const estado = getByText(/estado:/i);
    const complemento = getByText(/complemento:/i);
    const save = getByText("Salvar");
    [
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      complemento,
      save,
    ].forEach((element) => expect(element).toBeInTheDocument());
  });

  it("should render edit address state", () => {
    const { getByText } = render(
      <AddressData enderecoId="2020" isActive={true} />
    );

    const edit = getByText("editar");
    fireEvent.click(edit);
    const helperText = getByText(/informe os dados de endereço\./i);

    expect(helperText).toBeInTheDocument();
  });
});
