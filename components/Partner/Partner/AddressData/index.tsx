import Address from "./address";
import AddressForm from "./form";

interface Props {
  addressId: string | null;
  partnerId: string;
}

export default function AddressData({ addressId, partnerId }: Props) {
  return (
    <>
      {addressId ? (
        <Address addressId={addressId} />
      ) : (
        <AddressForm partnerId={partnerId} />
      )}
    </>
  );
}
