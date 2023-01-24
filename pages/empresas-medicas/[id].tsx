import MainContent from "../../components/Containers/MainContent";
import {
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { GetServerSidePropsContext } from "next";
import { server } from "../../config/server";
import { EmpresasMedicas } from "@prisma/client";
import CompanyData from "../../components/MedicalCompany/CompanyData";
import FinancialData from "../../components/FinancialData";
import AddressData from "../../components/AddressData";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import QuadroSocietario from "../../components/MedicalCompany/QuadroSocietario";
import Documentos from "../../components/MedicalCompany/Documentos";

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
  const supabaseClient = useSupabaseClient();
  const toast = useToast();
  const router = useRouter();

  const handleUploadFile = async (file: File | null, fileName: string) => {
    if (file) {
      const { error } = await supabaseClient.storage
        .from("empresas-medicas-documentos")
        .upload(fileName, file);
      if (error)
        toast({
          duration: 9000,
          title: "Não foi possível fazer upload de arquivo!",
          status: "error",
          isClosable: true,
        });
    }
  };

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
          <Tab>Quadro societário</Tab>
          <Tab>Documentos</Tab>
          <Tab>CRM</Tab>
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
              accountId={company.ContaCorrenteId}
            />
          </TabPanel>
          <TabPanel>
            {/* Dados de endereço */}
            <AddressData
              addressId={company.EnderecoId}
              pushRouteAfterRequest={() =>
                router.push(`/empresas-medicas/${company.Id}`)
              }
            />
          </TabPanel>
          <TabPanel>
            {/* Quadro societário */}
            <QuadroSocietario />
          </TabPanel>
          <TabPanel>
            {/* Documentos */}
            <Documentos />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainContent>
  );
}
