import { render } from "@testing-library/react";
import { DoctorEntity } from "pages/medicos/[id]";
import DoctorEditPersonalData from "../DoctorEditPersonalData";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("DoctorEditPersonalData", () => {
  const mockedDoctorData: DoctorEntity = {
    Cpf: "022.022.022-22",
    CriadoEm: new Date(),
    Crm: "4645",
    DataNascimento: "1999-31-31",
    Email: "teste@gmail.com",
    EmpresaMedicaId: null,
    EnderecoId: null,
    EstadoCivil: "CASADO",
    Id: "1",
    Nacionalidade: "brasileiro",
    Nome: "José",
    RG: "11111",
    TelefonePessoal: "(71) 9999-999",
    ModificadoEm: null,
    PIS: null,
    TituloEleitor: null,
  };
  it("should rende proper snapshot", () => {
    const { asFragment } = render(
      <DoctorEditPersonalData
        doctor={mockedDoctorData}
        setIsEditState={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
