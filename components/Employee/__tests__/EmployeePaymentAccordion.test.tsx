import { Accordion } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import EmployeePaymentAccordion from "../EmployeePaymentAccordion";
import { Pagamento } from "../EmployeePayments";

describe("EmployeePaymentAccordion test suite", () => {
  it("should render with recibo", () => {
    const pagamento: Pagamento = {
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
    };
    const { getByRole, getByText } = render(
      <Accordion>
        <EmployeePaymentAccordion pagamento={pagamento} />
      </Accordion>
    );
    const accordionButton = getByRole("button", {
      name: /décimo terceiro salário efetuado em: 07\/02\/2023 valor: r\$ 2\.000,00/i,
    });
    const recibo = getByText("holerite assinada");
    expect(accordionButton).toBeInTheDocument();
    expect(recibo).toBeInTheDocument();
  });

  it("should render without recibo", () => {
    const pagamento: Pagamento = {
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
      ReciboId: null,
      Tipo: "DECIMO_TERCEIRO_SALARIO",
      Valor: "2000.00",
      Recibo: null,
    };
    const { getByRole, getByText } = render(
      <Accordion>
        <EmployeePaymentAccordion pagamento={pagamento} />
      </Accordion>
    );
    const accordionButton = getByRole("button", {
      name: /décimo terceiro salário efetuado em: 07\/02\/2023 valor: r\$ 2\.000,00/i,
    });
    const recibo = getByText("Salve o recibo deste pagamento!");
    const saveButton = getByText("salvar");

    expect(accordionButton).toBeInTheDocument();
    expect(recibo).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
});
