import { VStack, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SerializedPessoa } from "../../../pages/socios";
import Partner from "../Partner";

interface Props {
  partners: SerializedPessoa[];
}

export default function PartnersList({ partners }: Props) {
  const router = useRouter();
  return (
    <VStack alignItems="flex-start">
      <Flex my={5} wrap="wrap">
        {partners.map((partner) => (
          <Partner
            key={partner.Id}
            nome={partner.Nome}
            participacao={partner.Participacao}
            dataNascimento={partner.DataNascimento}
            id={partner.Id}
          />
        ))}
      </Flex>

      <Button
        colorScheme="green"
        onClick={() => router.push("/socios/cadastrar")}
      >
        Cadastrar novo sócio
      </Button>
    </VStack>
  );
}
