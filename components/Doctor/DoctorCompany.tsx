import { Badge, Spinner, Text, VStack } from "@chakra-ui/react";
import { EmpresasMedicas } from "@prisma/client";
import ContentTitle from "components/Shared/ContentTitle";
import { DoctorEntity } from "pages/medicos/[id]";
import useSwr from "swr";
import { fetcher } from "utils/fetcher";
import DoctorSearchEmpresaMedica from "./DoctorSearchEmpresaMedica";

interface Props {
  doctor: DoctorEntity;
}

export default function DoctorCompany({ doctor }: Props) {
  const { data, isLoading, error } = useSwr<EmpresasMedicas>(
    doctor.EmpresaMedicaId
      ? `/api/empresas-medicas/${doctor.EmpresaMedicaId}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (isLoading) return <Spinner />;

  if (error) return <Text>Houve um erro na busca da empresa médica.</Text>;

  return (
    <VStack w="300px" alignItems="flex-start">
      <ContentTitle title="Vinculado à empresa" />
      {doctor.EmpresaMedicaId ? (
        <Badge colorScheme="blue">
          {doctor.EmpresaMedicaId ? data?.RazaoSocial : "N/A"}
        </Badge>
      ) : (
        <DoctorSearchEmpresaMedica doctor={doctor} />
      )}
    </VStack>
  );
}
