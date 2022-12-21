import { Text } from "@chakra-ui/react";
import { PessoasTipo } from "@prisma/client";
import superjson from "superjson";
import MainContent from "../../components/Containers/MainContent";
import EmptyPartners from "../../components/Partner/EmptyPartners";
import PartnersList from "../../components/Partner/PartnersList";
import prisma from "../../services/Prisma";

export interface SerializedPessoa {
  Id: string;
  Nome: string;
  Cpf: string;
  DataNascimento: string;
  CriadoEm: Date;
  ModificadoEm: Date | null;
  Tipo: PessoasTipo;
  EnderecoId: string | null;
  Crm: string | null;
  EmpresaMedicaId: string | null;
  Participacao: number | null;
  Salario: number | null;
  StatusAdmissao: number | null;
}

interface Props {
  partners: SerializedPessoa[];
}

export async function getServerSideProps() {
  const result = await prisma.pessoas.findMany({
    where: {
      Tipo: "SOCIO",
    },
  });

  const { json: partners } = superjson.serialize(result);

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
      {partners ? <PartnersList partners={partners} /> : <EmptyPartners />}
    </MainContent>
  );
}
