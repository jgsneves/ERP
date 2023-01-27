import { Divider, Flex, VStack, Text } from "@chakra-ui/react";
import Doctor from "../Doctor/DoctorCard";
import CreateNewDoctor from "./CreateNewDoctor";
import { Pessoas } from "@prisma/client";

interface Props {
  empresaId: string;
  empresaName: string;
  socios: Pessoas[];
}

export default function QuadroSocietario({
  empresaId,
  empresaName,
  socios,
}: Props) {
  return (
    <VStack alignItems="flex-start">
      <Flex width="100%" alignItems="center" py={3}>
        <Text as="b" minW="fit-content" mr={2}>
          Sócios
        </Text>
        <Divider />
      </Flex>

      <Flex wrap="wrap">
        {socios.length > 0 ? (
          socios.map((doc) => (
            <Doctor
              key={doc.Id}
              id={doc.Id}
              CRM={doc.Crm}
              name={doc.Nome}
              medicalCompany={empresaName}
            />
          ))
        ) : (
          <Text>Ainda não há médicos cadastrados nessa empresa.</Text>
        )}
      </Flex>

      <Flex width="100%" alignItems="center" py={3}>
        <Text as="b" minW="fit-content" mr={2}>
          Cadastrar novo sócio
        </Text>
        <Divider />
      </Flex>

      <CreateNewDoctor empresaId={empresaId} />
    </VStack>
  );
}
