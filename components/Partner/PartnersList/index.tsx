import { Box } from "@chakra-ui/react";
import { Pessoas } from "@prisma/client";
import { SerializedPessoa } from "../../../pages/socios";
import Partner from "../Partner";

interface Props {
  partners: SerializedPessoa[];
}

export default function PartnersList({ partners }: Props) {
  return (
    <Box mt={5}>
      {partners.map((partner) => (
        <Partner
          key={partner.Id}
          nome={partner.Nome}
          participacao={partner.Participacao}
          dataNascimento={partner.DataNascimento}
        />
      ))}
    </Box>
  );
}
