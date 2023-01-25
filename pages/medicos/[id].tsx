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
import { GetServerSidePropsContext } from "next";
import router from "next/router";
import { DoctorEntity } from ".";
import AddressData from "../../components/AddressData";
import MainContent from "../../components/Containers/MainContent";
import FinancialData from "../../components/FinancialData";
import { server } from "../../config/server";

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

interface Props {
  doctor: DoctorEntity;
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
              accountId={doctor.ContaCorrenteId}
              pessoaId={doctor.Id}
            />
          </TabPanel>
          <TabPanel>
            <AddressData
              addressId={doctor.EnderecoId}
              pessoaId={doctor.Id}
              pushRouteAfterRequest={() => router.push(`/medicos/${doctor.Id}`)}
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
