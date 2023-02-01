import { Flex } from "@chakra-ui/react";
import EmployeeObservacoes from "./EmployeeObservacoes";
import EmployeePerformanceTable from "./EmployeePerformanceTable";
import EmployeeUploadPerformance from "./EmployeeUploadPerformance";

interface Props {
  employeeId: string;
  isActive: boolean;
}

export default function EmployeePerformance({ employeeId, isActive }: Props) {
  return (
    <Flex wrap="wrap" gap={4} justifyContent="space-between">
      <EmployeePerformanceTable isActive={isActive} employeeId={employeeId} />
      <EmployeeUploadPerformance employeeId={employeeId} />
      <EmployeeObservacoes employeeId={employeeId} isActive={isActive} />
    </Flex>
  );
}
