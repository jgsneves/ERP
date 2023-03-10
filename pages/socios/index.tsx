import { Text } from "@chakra-ui/react";
import { Pessoas } from "@prisma/client";
import MainContent from "components/Containers/MainContent";
import EmptyEntityList from "components/EmptyEntityList";
import ErrorPage from "components/ErrorPage/ErrorPage";
import PartnersList from "components/Partner/PartnersList";
import { server } from "config/server";
import { ErrorHandler } from "utils/ErrorHandler";

export interface Partner
  extends Omit<
    Pessoas,
    | "DataNascimento"
    | "Tipo"
    | "Crm"
    | "EmpresaMedicaId"
    | "Salario"
    | "StatusAdmissao"
  > {
  DataNascimento: string;
}
interface Props {
  partners: Partner[];
  error?: any;
}

export async function getServerSideProps() {
  try {
    const result = await fetch(`${server}/api/socios`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const partners = await result.json();

    return {
      props: { partners },
    };
  } catch (error) {
    ErrorHandler.logServerSideRenderPropsError(error);
    return {
      props: { error },
    };
  }
}

export default function Socios({ partners, error }: Props) {
  if (error)
    return (
      <MainContent>
        <ErrorPage />
      </MainContent>
    );

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Sócios
      </Text>
      <Text>Todos os sócios cadastrados da empresa.</Text>
      {partners.length > 0 ? (
        <PartnersList partners={partners} />
      ) : (
        <EmptyEntityList
          helperText="Ainda não há sócios cadastrados."
          hrefToRedirect="/socios/cadastrar"
        />
      )}
    </MainContent>
  );
}
