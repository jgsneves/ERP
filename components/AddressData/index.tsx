import { useState } from "react";
import Address from "./address";
import Edit from "./edit";
import AddressForm from "./edit";
import Register from "./register";

interface Props {
  addressId: string | null;
  pushRouteAfterRequest: () => void;
  pessoaId?: string;
  empresaMedicaId?: string;
}

export type AddressDataState = "register" | "edit" | "showData";

export default function AddressData({
  addressId,
  empresaMedicaId,
  pessoaId,
  pushRouteAfterRequest,
}: Props) {
  const [state, setState] = useState<AddressDataState>(
    addressId ? "showData" : "register"
  );

  return (
    <>
      {state === "edit" && addressId && (
        <Edit
          addressId={addressId}
          pushRouteAfterRequest={pushRouteAfterRequest}
        />
      )}
      {state === "register" && (
        <Register
          pessoaId={pessoaId}
          empresaMedicaId={empresaMedicaId}
          pushRouteAfterRequest={pushRouteAfterRequest}
        />
      )}
      {state === "showData" && addressId && (
        <Address addressId={addressId} setState={setState} />
      )}
    </>
  );
}
