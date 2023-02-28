import { Flex, VStack, Text, Alert, AlertIcon } from "@chakra-ui/react";
import { Pessoas } from "@prisma/client";
import DoctorCard from "components/Doctor/DoctorCard";
import ContentTitle from "components/Shared/ContentTitle";

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
    <VStack alignItems="flex-start" spacing={3}>
      <Text as="b">Sócios</Text>

      <Flex wrap="wrap">
        {socios.length > 0 ? (
          socios.map((doc) => (
            <DoctorCard
              key={doc.Id}
              id={doc.Id}
              CRM={doc.Crm}
              name={doc.Nome}
              medicalCompany={empresaName}
            />
          ))
        ) : (
          <Alert status="info">
            <AlertIcon />
            <Text>Ainda não há médicos cadastrados nessa empresa.</Text>
          </Alert>
        )}
      </Flex>
    </VStack>
  );
}
