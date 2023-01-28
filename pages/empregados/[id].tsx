import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { ContasCorrente, Enderecos } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { Employee } from ".";
import AddressData from "../../components/AddressData";
import MainContent from "../../components/Containers/MainContent";
import Summary from "../../components/Employee/Summary";
import FinancialData from "../../components/FinancialData";
import { server } from "../../config/server";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const url = `${server}/api/empregados/${ctx.params?.id}`;

  const result = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const employee = await result.json();

  return {
    props: { employee },
  };
}

export interface EmployeeWithAccountAndAddress extends Employee {
  ContasCorrente: ContasCorrente;
  Endereco: Enderecos;
}

interface Props {
  employee: EmployeeWithAccountAndAddress;
}

export default function Empregado({ employee }: Props) {
  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        {employee.Nome}
      </Text>
      <Text>Confira os dados deste empregado.</Text>

      <Link href="/empregados">
        <ArrowBackIcon boxSize={8} mt="6" cursor="pointer" />
      </Link>

      <Tabs mt={2}>
        <TabList>
          <Tab>Sumário</Tab>
          <Tab>Dados financeiros</Tab>
          <Tab>Dados de endereço</Tab>
          <Tab>Pagamentos</Tab>
          <Tab>Desempenho</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* Sumário */}
            <Summary employee={employee} />
          </TabPanel>
          <TabPanel>
            {/* Dados financeiros */}
            <FinancialData
              pessoaId={employee.Id}
              account={employee.ContasCorrente}
            />
          </TabPanel>
          <TabPanel>
            {/* Dados de endereço */}
            <AddressData
              endereco={employee.Endereco}
              empresaMedicaId={employee.Id}
            />
          </TabPanel>
          <TabPanel>
            {/* Pagamentos */}
            Todos os pagamentos pros empregados (salário, vale transporte, 13º
            salário, férias, reembolso)
          </TabPanel>
          <TabPanel>
            {/* Desempenho */}
            Aqui vamos colocar upload de folha de ponto, atestados, e um campo
            para observações com linha do tempo
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainContent>
  );
}
