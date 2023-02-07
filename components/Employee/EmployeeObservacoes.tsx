import {
  VStack,
  Alert,
  AlertIcon,
  Text,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import ContentTitle from "../Shared/ContentTitle";
import EmployeeComment from "./EmployeeComment";
import EmployeeCreateComment from "./EmployeeCreateComment";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { BoundedMutationHelper } from "../../utils/BoundedMutationHelper";
import { EmpregadosObservacoes } from "@prisma/client";

interface Props {
  employeeId: string;
  isActive: boolean;
}

export interface Observacoes extends Omit<EmpregadosObservacoes, "Data"> {
  Data: string;
}

export default function EmployeeObservacoes({ employeeId, isActive }: Props) {
  const {
    data: observacoes,
    isLoading,
    mutate,
  } = useSWR<Observacoes[]>(
    isActive ? `/api/empregados-observacoes?empregadoId=${employeeId}` : null,
    fetcher
  );

  BoundedMutationHelper.setEmployeeObservacoesMutator(mutate);

  if (isLoading) {
    <Flex w="500px" h="200px">
      <Spinner colorScheme="green" />
    </Flex>;
  }

  return (
    <VStack width="500px" alignItems="flex-start" spacing={5}>
      <ContentTitle title="Observações" />
      {observacoes && observacoes?.length === 0 && (
        <Alert status="info">
          <AlertIcon />
          <Text>Não há observações para este empregado</Text>
        </Alert>
      )}
      {observacoes &&
        observacoes.map((observacao) => (
          <EmployeeComment
            key={observacao.Id}
            content={observacao.Conteudo}
            date={observacao.Data}
          />
        ))}

      <EmployeeCreateComment empregadoId={employeeId} />
    </VStack>
  );
}
