import { Spinner, Text } from "@chakra-ui/react";
import { Pessoas } from "@prisma/client";
import MainContent from "components/Containers/MainContent";
import EmployeesList from "components/Employee/EmployeesList";
import EmptyEntityList from "components/EmptyEntityList";
import ErrorPage from "components/ErrorPage/ErrorPage";
import useSwr from "swr";
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

export default function Empregados() {
  const { data, isLoading, error } = useSwr<Employee[]>(
    `/api/empregados`,
    fetcher
  );

  console.log(data);

  if (isLoading)
    return (
      <MainContent>
        <Spinner />
      </MainContent>
    );

  if (error || !data)
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
      {data.length > 0 ? (
        <EmployeesList employees={data} />
      ) : (
        <EmptyEntityList
          helperText="Não há empregados cadastrados na empresa."
          hrefToRedirect="/empregados/cadastrar"
        />
      )}
    </MainContent>
  );
}
