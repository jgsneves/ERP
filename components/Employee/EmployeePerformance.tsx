import { Flex } from "@chakra-ui/react";
import { Observacoes } from "../../pages/empregados/[id]";
import EmployeeObservacoes from "./EmployeeObservacoes";
import EmployeePerformanceTable from "./EmployeePerformanceTable";
import EmployeeUploadPerformance from "./EmployeeUploadPerformance";

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
      <EmployeePerformanceTable />
      <EmployeeUploadPerformance employeeId={employeeId} />
      <EmployeeObservacoes employeeId={employeeId} observacoes={observacoes} />
    </Flex>
  );
}
