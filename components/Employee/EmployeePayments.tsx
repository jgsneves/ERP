import {
  Accordion,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import EmployeeCreatePayment from "./EmployeeCreatePayment";
import useSwr from "swr";
import { Documentos, EmpregadosPagamentos } from "@prisma/client";
import { fetcher } from "../../utils/fetcher";
import EmployeePaymentAccordion from "./EmployeePaymentAccordion";
import { BoundedMutationHelper } from "../../utils/BoundedMutationHelper";

export interface Pagamento
  extends Omit<EmpregadosPagamentos, "CriadoEm" | "Valor"> {
  CriadoEm: string;
  Valor: string;
  Comprovante: Documentos;
  Recibo: Documentos | null;
}

interface Props {
  empregadoId: string;
  salario: number | null;
  isActive: boolean;
}

export default function EmployeePayments({
  empregadoId,
  salario,
  isActive,
}: Props) {
  const { data, isLoading, mutate } = useSwr<Pagamento[]>(
    isActive ? `/api/empregados-pagamentos?empregadoId=${empregadoId}` : null,
    fetcher
  );

  BoundedMutationHelper.setEmployeePaymentsMutator(mutate);

  if (isLoading) return <Spinner />;

  return (
    <VStack alignItems="flex-start" spacing={8}>
      <Text fontWeight="bold">
        Todos os pagamentos para este empregado
        <Text as="i" fontWeight="light" fontSize="sm" ml={2}>
          (salário, vale transporte, 13º salário, férias, reembolso)
        </Text>
      </Text>
      <Accordion w="900px" allowToggle>
        {data && data.length === 0 && (
          <Alert status="info">
            <AlertIcon />
            <AlertTitle>
              Não há pagamentos cadastrados para este empregado
            </AlertTitle>
          </Alert>
        )}
        {data &&
          data.map((pagamento) => (
            <EmployeePaymentAccordion
              key={pagamento.Id}
              pagamento={pagamento}
            />
          ))}
      </Accordion>
      <EmployeeCreatePayment empregadoId={empregadoId} salario={salario} />
    </VStack>
  );
}
