import { Enderecos } from "@prisma/client";
import Address from "./address";
import Register from "./register";

interface Props {
  endereco: Enderecos | null;
  pessoaId?: string;
  empresaMedicaId?: string;
}

export default function AddressData({
  endereco,
  pessoaId,
  empresaMedicaId,
}: Props) {
  return (
    <>
      {endereco ? (
        <Address endereco={endereco} />
      ) : (
        <Register empresaMedicaId={empresaMedicaId} pessoaId={pessoaId} />
      )}
    </>
  );
}
