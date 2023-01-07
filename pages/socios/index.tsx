import { Text } from "@chakra-ui/react";
import { Pessoas, PessoasTipo } from "@prisma/client";
import MainContent from "../../components/Containers/MainContent";
import EmptyEntityList from "../../components/EmptyEntityList";
import PartnersList from "../../components/Partner/PartnersList";
import { server } from "../../config/server";

export interface SerializedPessoa {
  Id: string;
  Nome: string;
  Cpf: string;
  DataNascimento: string;
  CriadoEm: Date;
  ModificadoEm: Date | null;
  Tipo: PessoasTipo;
  EnderecoId: string | null;
  Participacao: number | null;
}

interface Props {
  partners: SerializedPessoa[];
}

export async function getServerSideProps() {
  const result = await fetch(`${server}/api/socios`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const partners = await result.json();

  return {
    props: { partners },
  };
}

export default function Socios({ partners }: Props) {
  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Sócios
      </Text>
      <Text>Todos os sócios cadastrados da empresa.</Text>
      {partners ? (
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
