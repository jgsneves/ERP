import MainContent from "components/Containers/MainContent";
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
import { server } from "config/server";
import {
  ContasCorrente,
  EmpresasMedicas,
  Enderecos,
  Pessoas,
} from "@prisma/client";
import CompanyData from "components/MedicalCompany/CompanyData";
import FinancialData from "components/FinancialData";
import AddressData from "components/AddressData";
import QuadroSocietario from "components/MedicalCompany/QuadroSocietario";
import { ErrorHandler } from "utils/ErrorHandler";
import { useState } from "react";

interface Company extends EmpresasMedicas {
  Endereco: Enderecos | null;
  ContasCorrentes: ContasCorrente[];
  Socios: Pessoas[];
}
interface Props {
  company: Company;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const url = `${server}/api/empresas-medicas/${context.params?.id}`;

    const result = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const company = await result.json();

    return {
      props: { company },
    };
  } catch (error) {
    ErrorHandler.logAxiosGetError(error);
  }
}

export default function EmpresaMedica({ company }: Props) {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        {company.RazaoSocial}
      </Text>
      <Text>Confira os dados desta empresa médica.</Text>

      <Link href="/empresas-medicas">
        <ArrowBackIcon boxSize={8} mt="6" cursor="pointer" />
      </Link>

      <Tabs
        mt={2}
        onChange={(index) => setActiveTabIndex(index)}
        variant="enclosed"
      >
        <TabList>
          <Tab>Dados da sociedade</Tab>
          <Tab>Dados financeiros</Tab>
          <Tab>Dados de endereço</Tab>
          <Tab>Quadro societário</Tab>
          <Tab>Documentos</Tab>
          <Tab>Notas fiscais</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* Dados da sociedade */}
            <CompanyData
              cnpj={company.Cnpj}
              razaoSocial={company.RazaoSocial}
            />
          </TabPanel>
          <TabPanel>
            {/* Dados financeiros */}
            <FinancialData
              empresaMedicaId={company.Id}
              isActive={activeTabIndex === 1}
            />
          </TabPanel>
          <TabPanel>
            {/* Dados de endereço */}
            <AddressData
              isActive={activeTabIndex === 2}
              empresaMedicaId={company.Id}
              enderecoId={company.EnderecoId}
            />
          </TabPanel>
          <TabPanel>
            {/* Quadro societário */}
            <QuadroSocietario
              empresaId={company.Id}
              empresaName={company.RazaoSocial}
              socios={company.Socios}
            />
          </TabPanel>
          <TabPanel>
            {/* Documentos */}
            {/* <Documentos /> */}
            <h1>documentos</h1>
          </TabPanel>
          <TabPanel>
            <h1>
              uma tabela com todos o serviços médicos prestados pela empresa,
              mostrando o médico que fez, onde foi feito e a data
            </h1>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainContent>
  );
}
