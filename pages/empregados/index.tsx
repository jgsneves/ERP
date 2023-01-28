import { Text } from "@chakra-ui/react";
import { Pessoas } from "@prisma/client";
import MainContent from "../../components/Containers/MainContent";
import EmployeesList from "../../components/Employee/EmployeesList";
import EmptyEntityList from "../../components/EmptyEntityList";
import { server } from "../../config/server";

export interface Employee
  extends Omit<
    Pessoas,
    | "Tipo"
    | "Crm"
    | "EmpresaMedicaId"
    | "Participacao"
    | "DataNascimento"
    | "CriadoEm"
  > {
  DataNascimento: string;
  CriadoEm: string;
}

interface Props {
  employees: Employee[];
}

export async function getServerSideProps() {
  const result = await fetch(`${server}/api/empregados`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const employees = await result.json();

  return {
    props: { employees },
  };
}

export default function Empregados({ employees }: Props) {
  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Empregados
      </Text>
      <Text>Todos os empregados cadastrados na empresa.</Text>
      {employees ? (
        <EmployeesList employees={employees} />
      ) : (
        <EmptyEntityList
          helperText="Não há empregados cadastrados na empresa."
          hrefToRedirect="/empregados/cadastrar"
        />
      )}
    </MainContent>
  );
}
