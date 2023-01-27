import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { ContasCorrente, Enderecos, Pessoas } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import AddressData from "../../components/AddressData";
import MainContent from "../../components/Containers/MainContent";
import FinancialData from "../../components/FinancialData";
import { server } from "../../config/server";

export interface DoctorEntity
  extends Omit<
    Pessoas,
    "DataNascimento" | "Tipo" | "Participacao" | "Salario" | "StatusAdmissao"
  > {
  Endereco: Enderecos | null;
  ContasCorrente: ContasCorrente | null;
}

interface Props {
  doctor: DoctorEntity;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const url = `${server}/api/medicos/${context.params?.id}`;
  const result = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const doctor = await result.json();

  return {
    props: { doctor },
  };
}

export default function Doctor({ doctor }: Props) {
  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Dr. {doctor.Nome}
      </Text>
      <Text>Confira os dados do médico</Text>

      <Link href="/medicos">
        <ArrowBackIcon boxSize={8} mt="6" cursor="pointer" />
      </Link>

      <Tabs mt={2}>
        <TabList>
          <Tab>Sumário</Tab>
          <Tab>Dados financeiros</Tab>
          <Tab>Dados de endereço</Tab>
          <Tab>Documentos</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <h1>sumário</h1>
          </TabPanel>
          <TabPanel>
            <FinancialData
              account={doctor.ContasCorrente}
              pessoaId={doctor.Id}
            />
          </TabPanel>
          <TabPanel>
            <AddressData pessoaId={doctor.Id} endereco={doctor.Endereco} />
          </TabPanel>
          <TabPanel>
            <h1>Documentos</h1>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainContent>
  );
}
