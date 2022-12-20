import { Partner as PartnerInterface } from "../../../models/Partner";
import Partner from "../Partner";

interface Props {
  partners: PartnerInterface[];
}

export default function PartnersList({ partners }: Props) {
  return (
    <>
      {partners.map((partner) => {
        <Partner
          key={partner.nome}
          nome={partner.nome}
          cotaSocietaria={partner.cotaSocietaria}
          dataNascimento={partner.dataNascimento}
        />;
      })}
    </>
  );
}
