import Address from "./address";
import AddressForm from "./form";

interface Props {
  addressId: string | null;
  pessoaId?: string;
  empresaMedicaId?: string;
}

export default function AddressData({
  addressId,
  pessoaId,
  empresaMedicaId,
}: Props) {
  return (
    <>
      {addressId ? (
        <Address addressId={addressId} />
      ) : (
        <AddressForm pessoaId={pessoaId} empresaMedicaId={empresaMedicaId} />
      )}
    </>
  );
}
