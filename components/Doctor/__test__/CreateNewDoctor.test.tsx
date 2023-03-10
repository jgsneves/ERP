import { render } from "@testing-library/react";
import CreateNewDoctor from "../CreateNewDoctor";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("CreateNewDoctor", () => {
  it("should rende proper snapshot", () => {
    const { asFragment } = render(<CreateNewDoctor />);
    expect(asFragment()).toMatchSnapshot();
  });
});
