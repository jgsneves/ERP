import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { Pessoas } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";
import MainContent from "../../components/Containers/MainContent";
import FinancialData from "../../components/Partner/Partner/FinancialData";
import PersonalData from "../../components/Partner/Partner/PersonalData";
import { server } from "../../config/server";

interface Props {
  partner: Pessoas;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const url = `${server}/api/socios/${context.params?.id}`;
  const result = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const partner = await result.json();

  return {
    props: { partner },
  };
}

export default function Socio({ partner }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = () => {};

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        {partner.Nome}
      </Text>
      <Text>Edite os dados do sócio.</Text>

      <Link href="/socios">
        <ArrowBackIcon boxSize={8} mt="6" cursor="pointer" />
      </Link>

      <Tabs mt={2}>
        <TabList>
          <Tab>Dados pessoais</Tab>
          <Tab>Dados financeiros</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PersonalData
              id={partner.Id}
              cpf={partner.Cpf}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              nome={partner.Nome}
              participacao={partner.Participacao!}
            />
          </TabPanel>
          <TabPanel>
            <FinancialData
              accountId={partner.ContaCorrenteId}
              partnerId={partner.Id}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainContent>
  );
}
