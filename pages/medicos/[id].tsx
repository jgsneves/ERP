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
import { useState } from "react";
import AddressData from "components/AddressData";
import MainContent from "components/Containers/MainContent";
import FinancialData from "components/FinancialData";
import { server } from "config/server";

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
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Dr. {doctor.Nome}
      </Text>
      <Text>Confira os dados do médico</Text>

      <Link href="/medicos">
        <ArrowBackIcon boxSize={8} mt="6" cursor="pointer" />
      </Link>

      <Tabs mt={2} onChange={(index) => setActiveTab(index)} variant="enclosed">
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
            <FinancialData isActive={activeTab === 1} pessoaId={doctor.Id} />
          </TabPanel>
          <TabPanel>
            <AddressData
              pessoaId={doctor.Id}
              isActive={activeTab === 2}
              enderecoId={doctor.EnderecoId}
            />
          </TabPanel>
          <TabPanel>
            <h1>Documentos</h1>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainContent>
  );
}
