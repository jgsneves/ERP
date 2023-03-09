import { render } from "@testing-library/react";
import {
  DocumentoWithDate,
  GetDocumentosResponse,
} from "../../../pages/api/documentos";
import EmployeeDocuments from "../EmployeeDocuments";

jest.mock("swr", () => {
  const originalModule = jest.requireActual("swr");

  const documents: DocumentoWithDate[] = [
    {
      CriadoEm: "data",
      EmpresaMedicaId: null,
      Id: "1",
      ModificadoEm: null,
      Nome: "contrato de trabalho de josé da silva",
      PessoaId: "1",
      Tipo: "CONTRATO_SOCIAL_ASSINADO",
      Url: "http://www.google.com",
    },
  ];

  const firstResponse: GetDocumentosResponse = {
    documentos: documents,
    pagina: 1,
    totalPaginas: 1,
  };

  const secondResponse: GetDocumentosResponse = {
    documentos: [],
    pagina: 1,
    totalPaginas: 1,
  };

  return {
    __esModule: true,
    ...originalModule,
    default: jest
      .fn()
      .mockReturnValueOnce({ isLoading: false, data: firstResponse })
      .mockReturnValue({ isLoading: false, data: secondResponse }),
  };
});

describe("EmployeeDocuments test suite", () => {
  it("should render document of type contrato_de_trabalho_assinado", () => {
    const { getByText } = render(
      <EmployeeDocuments
        empregadoId="1"
        empregadoNome="José da Silva"
        isActive={true}
      />
    );
    expect(getByText(/contrato social assinado/i)).toBeInTheDocument();
    expect(getByText(/faça upload do documento/i)).toBeInTheDocument();
  });
  it("should not render document list", () => {
    const { getByText, queryByText } = render(
      <EmployeeDocuments
        empregadoId="1"
        empregadoNome="José da Silva"
        isActive={true}
      />
    );
    expect(queryByText(/contrato social assinado/i)).toBeNull();
    expect(getByText(/faça upload do documento/i)).toBeInTheDocument();
  });
});
