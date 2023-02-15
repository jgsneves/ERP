import { Button, Flex, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Employee } from "pages/empregados";
import EmployeeCard from "./EmployeeCard";

interface Props {
  employees: Employee[];
}

export default function EmployeesList({ employees }: Props) {
  const router = useRouter();
  return (
    <VStack alignItems="flex-start" mt={5}>
      <Flex flexWrap="wrap" gap={5}>
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.Id}
            id={employee.Id}
            name={employee.Nome}
            salary={employee.Salario}
          />
        ))}
      </Flex>

      <Button
        colorScheme="green"
        onClick={() => router.push("/empregados/cadastrar")}
      >
        Cadastrar novo empregado
      </Button>
    </VStack>
  );
}
