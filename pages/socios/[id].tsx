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
import MainContent from "../../components/Containers/MainContent";
import FinancialData from "../../components/FinancialData";
import PersonalData from "../../components/Partner/PersonalData";
import AddressData from "../../components/AddressData";
import { server } from "../../config/server";
import { useRouter } from "next/router";
import { Partner } from ".";

interface Props {
  partner: Partner;
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
  const router = useRouter();

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        {partner.Nome}
      </Text>
      <Text>Confira os dados do sócio.</Text>

      <Link href="/socios">
        <ArrowBackIcon boxSize={8} mt="6" cursor="pointer" />
      </Link>

      <Tabs mt={2}>
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
            <FinancialData
              accountId={partner.ContaCorrenteId}
              pessoaId={partner.Id}
            />
          </TabPanel>
          <TabPanel>
            <AddressData
              addressId={partner.EnderecoId}
              pessoaId={partner.Id}
              pushRouteAfterRequest={() => router.push(`/socios/${partner.Id}`)}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainContent>
  );
}
