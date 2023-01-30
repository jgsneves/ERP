import { Flex, VStack, Text, Alert, AlertIcon } from "@chakra-ui/react";
import Doctor from "../Doctor/DoctorCard";
import CreateNewDoctor from "./CreateNewDoctor";
import { Pessoas } from "@prisma/client";
import ContentTitle from "../Shared/ContentTitle";

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
      <ContentTitle title="Sócios" />

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
          <Alert status="info">
            <AlertIcon />
            <Text>Ainda não há médicos cadastrados nessa empresa.</Text>
          </Alert>
        )}
      </Flex>

      <ContentTitle title="Cadastrar novo sócio" />
      <CreateNewDoctor empresaId={empresaId} />
    </VStack>
  );
}
