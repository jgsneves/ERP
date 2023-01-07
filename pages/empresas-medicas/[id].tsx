import MainContent from "../../components/Containers/MainContent";
import {
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetServerSidePropsContext } from "next";
import { server } from "../../config/server";
import { EmpresasMedicas } from "@prisma/client";
import CompanyData from "../../components/MedicalCompany/CompanyData";
import FinancialData from "../../components/FinancialData";
import AddressData from "../../components/AddressData";

interface Props {
  company: EmpresasMedicas;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const url = `${server}/api/empresasmedicas/${context.params?.id}`;

  const result = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const company = await result.json();

  return {
    props: { company },
  };
}

export default function EmpresaMedica({ company }: Props) {
  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        {company.RazaoSocial}
      </Text>
      <Text>Confira os dados desta empresa médica.</Text>

      <Link href="/empresas-medicas">
        <ArrowBackIcon boxSize={8} mt="6" cursor="pointer" />
      </Link>

      <Tabs mt={2}>
        <TabList>
          <Tab>Dados da sociedade</Tab>
          <Tab>Dados financeiros</Tab>
          <Tab>Dados de endereço</Tab>
          <Tab>Sócios</Tab>
          <Tab>Documentos</Tab>
          <Tab>CRM</Tab>
          <Tab>Notas fiscais</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <CompanyData
              cnpj={company.Cnpj}
              razaoSocial={company.RazaoSocial}
            />
          </TabPanel>
          <TabPanel>
            <FinancialData
              empresaMedicaId={company.Id}
              accountId={company.ContaCorrenteId}
            />
          </TabPanel>
          <TabPanel>
            <AddressData
              addressId={company.EnderecoId}
              empresaMedicaId={company.Id}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainContent>
  );
}
