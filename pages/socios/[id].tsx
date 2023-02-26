import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import MainContent from "components/Containers/MainContent";
import FinancialData from "components/FinancialData";
import PersonalData from "components/Partner/PersonalData";
import AddressData from "components/AddressData";
import { server } from "config/server";
import { Partner } from ".";
import { useState } from "react";
import { ErrorHandler } from "utils/ErrorHandler";
import ErrorPage from "components/ErrorPage/ErrorPage";

interface Props {
  partner: Partner;
  error?: any;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const url = `${server}/api/socios/${context.params?.id}`;
    const result = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const partner = await result.json();

    return {
      props: { partner },
    };
  } catch (error) {
    ErrorHandler.logServerSideRenderPropsError(error);
    return {
      props: { error },
    };
  }
}

export default function Socio({ partner, error }: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (error)
    return (
      <MainContent>
        <ErrorPage />
      </MainContent>
    );

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        {partner.Nome}
      </Text>
      <Text>Confira os dados do sócio.</Text>

      <Link href="/socios">
        <ArrowBackIcon boxSize={8} mt="6" cursor="pointer" />
      </Link>

      <Tabs mt={2} onChange={(index) => setActiveIndex(index)}>
        <TabList>
          <Tab>Dados pessoais</Tab>
          <Tab>Dados financeiros</Tab>
          <Tab>Dados de endereço</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PersonalData
              id={partner.Id}
              cpf={partner.Cpf}
              nome={partner.Nome}
              dataNascimento={partner.DataNascimento}
              participacao={partner.Participacao!}
            />
          </TabPanel>
          <TabPanel>
            <FinancialData pessoaId={partner.Id} isActive={activeIndex === 1} />
          </TabPanel>
          <TabPanel>
            <AddressData
              pessoaId={partner.Id}
              isActive={activeIndex === 2}
              enderecoId={partner.EnderecoId}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainContent>
  );
}
