import { Alert, AlertIcon, Flex, Text, VStack } from "@chakra-ui/react";
import { EmpregadosObservacoes } from "@prisma/client";
import { Observacoes } from "../../pages/empregados/[id]";
import ContentTitle from "../Shared/ContentTitle";
import EmployeeComment from "./EmployeeComment";
import EmployeeCreateComment from "./EmployeeCreateComment";

interface Props {
  observacoes: Observacoes[];
  employeeId: string;
}

export default function EmployeePerformance({
  observacoes,
  employeeId,
}: Props) {
  return (
    <Flex wrap="wrap" gap={4} justifyContent="space-between">
      <VStack width="500px" alignItems="flex-start">
        <ContentTitle title="Observações" />
        {observacoes.length === 0 && (
          <Alert status="info">
            <AlertIcon />
            <Text>Não há observações para este empregado</Text>
          </Alert>
        )}
        {observacoes.map((observacao) => (
          <EmployeeComment
            key={observacao.Id}
            content={observacao.Conteudo}
            date={observacao.Data}
          />
        ))}

        <EmployeeCreateComment empregadoId={employeeId} />
      </VStack>
    </Flex>
  );
}
