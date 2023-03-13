import { EmpresasMedicas } from "@prisma/client";
import { render } from "@testing-library/react";
import { DoctorEntity } from "pages/medicos/[id]";
import DoctorCompany from "../DoctorCompany";

jest.mock("swr", () => {
  const originalModule = jest.requireActual("swr");

  const firstResponse: EmpresasMedicas = {
    Cnpj: "123",
    CriadoEm: new Date(),
    EnderecoId: null,
    Id: "1",
    ModificadoEm: null,
    RazaoSocial: "ABCD Empresa Médica",
  };

  return {
    __esModule: true,
    ...originalModule,
    default: jest
      .fn()
      .mockReturnValueOnce({
        isLoading: false,
        data: firstResponse,
      })
      .mockReturnValueOnce({
        isLoading: false,
        data: undefined,
        error: { ble: "foo" },
      })
      .mockReturnValue({ isLoading: false, data: undefined }),
  };
});

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn(),
  };
});

describe("DoctorCompany test suite", () => {
  it("should show badge", () => {
    const mockedProp = {
      EmpresaMedicaId: "1",
    } as DoctorEntity;
    const { getByText, asFragment } = render(
      <DoctorCompany doctor={mockedProp} />
    );
    expect(getByText("ABCD Empresa Médica")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should show error", () => {
    const mockedProp = {} as DoctorEntity;
    const { queryByText, asFragment } = render(
      <DoctorCompany doctor={mockedProp} />
    );
    expect(queryByText("ABCD Empresa Médica")).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not render a badge", () => {
    const mockedProp = {} as DoctorEntity;
    const { queryByText, asFragment } = render(
      <DoctorCompany doctor={mockedProp} />
    );
    expect(queryByText("ABCD Empresa Médica")).toBeNull();
    expect(asFragment()).toMatchSnapshot();
  });
});
