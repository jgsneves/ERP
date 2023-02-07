import { render } from "@testing-library/react";
import DoctorCard from "../DoctorCard";

describe("DoctorCard test suite", () => {
  it("should render", () => {
    const { asFragment } = render(
      <DoctorCard
        id="1"
        CRM="2020"
        name="José da Silva"
        medicalCompany="ABCD Empresa Médica"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
