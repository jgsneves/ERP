import { VStack, Alert, AlertIcon, Text } from "@chakra-ui/react";
import { Observacoes } from "../../pages/empregados/[id]";
import ContentTitle from "../Shared/ContentTitle";
import EmployeeComment from "./EmployeeComment";
import EmployeeCreateComment from "./EmployeeCreateComment";

interface Props {
  observacoes: Observacoes[];
  employeeId: string;
}

export default function EmployeeObservacoes({
  employeeId,
  observacoes,
}: Props) {
  return (
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
  );
}
