import { Text } from "@chakra-ui/react";
import { Pessoas } from "@prisma/client";
import MainContent from "components/Containers/MainContent";
import EmployeesList from "components/Employee/EmployeesList";
import EmptyEntityList from "components/EmptyEntityList";
import ErrorPage from "components/ErrorPage/ErrorPage";
import { server } from "config/server";
import { ErrorHandler } from "utils/ErrorHandler";

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
  error?: any;
}

export async function getServerSideProps() {
  try {
    const result = await fetch(`${server}/api/empregados`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const employees = await result.json();

    return {
      props: { employees },
    };
  } catch (error) {
    ErrorHandler.logServerSideRenderPropsError(error);
    return {
      props: { error },
    };
  }
}

export default function Empregados({ employees, error }: Props) {
  if (error) return <ErrorPage />;

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Empregados
      </Text>
      <Text>Todos os empregados cadastrados na empresa.</Text>
      {employees.length > 0 ? (
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
