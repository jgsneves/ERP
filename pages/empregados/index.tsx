import { Spinner, Text } from "@chakra-ui/react";
import { Pessoas } from "@prisma/client";
import MainContent from "components/Containers/MainContent";
import EmployeesList from "components/Employee/EmployeesList";
import EmptyEntityList from "components/EmptyEntityList";
import ErrorPage from "components/ErrorPage/ErrorPage";
import { server } from "config/server";
import useSwr from "swr";
import { ErrorHandler } from "utils/ErrorHandler";
import { fetcher } from "utils/fetcher";

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
  empregados: Employee[];
  error?: any;
}

export async function getServerSideProps() {
  try {
    const result = await fetch(`${server}/api/empregados`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const empregados = await result.json();

    return {
      props: { empregados },
    };
  } catch (error) {
    ErrorHandler.logServerSideRenderPropsError(error);
    return {
      props: { error },
    };
  }
}

export default function Empregados({ empregados, error }: Props) {
  if (error || !empregados)
    return (
      <MainContent>
        <ErrorPage />
      </MainContent>
    );

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Empregados
      </Text>
      <Text>Todos os empregados cadastrados na empresa.</Text>
      {empregados.length > 0 ? (
        <EmployeesList employees={empregados} />
      ) : (
        <EmptyEntityList
          helperText="Não há empregados cadastrados na empresa."
          hrefToRedirect="/empregados/cadastrar"
        />
      )}
    </MainContent>
  );
}
