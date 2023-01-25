import {
  Divider,
  Flex,
  VStack,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { MedicosResponse } from "../../pages/api/medicos";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import Doctor from "../Doctor/DoctorCard";
import CreateNewDoctor from "./CreateNewDoctor";

interface Props {
  empresaId: string;
  empresaName: string;
}

export default function QuadroSocietario({ empresaId, empresaName }: Props) {
  const { data, error, isLoading } = useSWR<MedicosResponse>(
    `/api/medicos?empresaMedicaId=${empresaId}`,
    fetcher
  );

  const toast = useToast();

  if (isLoading) return <Spinner />;

  if (error) {
    toast({
      title: "Houve algum erro.",
      description: error,
      isClosable: true,
      duration: 9000,
      status: "error",
    });
  }

  return (
    <VStack alignItems="flex-start">
      <Flex width="100%" alignItems="center" py={3}>
        <Text as="b" minW="fit-content" mr={2}>
          Sócios
        </Text>
        <Divider />
      </Flex>

      <Flex wrap="wrap">
        {data?.doctors.length! > 0 ? (
          data?.doctors.map((doc) => (
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
