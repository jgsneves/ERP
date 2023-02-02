import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";
import { Employee } from ".";
import AddressData from "../../components/AddressData";
import MainContent from "../../components/Containers/MainContent";
import EmployeePerformance from "../../components/Employee/EmployeePerformance";
import EmployeeSummary from "../../components/Employee/EmployeeSummary";
import FinancialData from "../../components/FinancialData";
import { server } from "../../config/server";
import { ErrorHandler } from "../../utils/ErrorHandler";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const url = `${server}/api/empregados/${ctx.params?.id}`;

    const result = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const employee = await result.json();

    return {
      props: { employee },
    };
  } catch (error) {
    ErrorHandler.logAxiosGetError(error);
  }
}

interface Props {
  employee: Employee;
}

export default function Empregado({ employee }: Props) {
  const [activeTabIndex, setActiveTabIndex] = useState<number | undefined>(
    undefined
  );

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        {employee.Nome}
      </Text>
      <Text>Confira os dados deste empregado.</Text>

      <Link href="/empregados">
        <ArrowBackIcon boxSize={8} mt="6" cursor="pointer" />
      </Link>

      <Tabs
        mt={2}
        variant="enclosed"
        onChange={(index) => setActiveTabIndex(index)}
      >
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
            <EmployeeSummary employee={employee} />
          </TabPanel>
          <TabPanel>
            {/* Dados financeiros */}
            <FinancialData
              pessoaId={employee.Id}
              isActive={activeTabIndex === 1}
            />
          </TabPanel>
          <TabPanel>
            {/* Dados de endereço */}
            <AddressData
              enderecoId={employee.EnderecoId}
              pessoaId={employee.Id}
              isActive={activeTabIndex === 2}
            />
          </TabPanel>
          <TabPanel>
            {/* Pagamentos */}
            Todos os pagamentos pros empregados (salário, vale transporte, 13º
            salário, férias, reembolso)
          </TabPanel>
          <TabPanel>
            {/* Desempenho */}
            <EmployeePerformance
              employeeId={employee.Id}
              isActive={activeTabIndex === 4}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainContent>
  );
}
