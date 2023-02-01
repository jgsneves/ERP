import Address from "./address";
import Register from "./register";

interface Props {
  enderecoId: string | null;
  pessoaId?: string;
  empresaMedicaId?: string;
  isActive: boolean;
}

export default function AddressData({
  enderecoId,
  pessoaId,
  empresaMedicaId,
  isActive,
}: Props) {
  return (
    <>
      {enderecoId ? (
        <Address enderecoId={enderecoId} isActive={isActive} />
      ) : (
        <Register empresaMedicaId={empresaMedicaId} pessoaId={pessoaId} />
      )}
    </>
  );
}
