import MainContent from "../../components/Containers/MainContent";
import {
  Button,
  Flex,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { EmpresasMedicasResponse } from "../api/empresasmedicas";
import { useRouter } from "next/router";
import { formatCNPJ } from "@brazilian-utils/brazilian-utils";

export default function EmpresasMedicasContainer() {
  const { data, isLoading } = useSWR<EmpresasMedicasResponse>(
    `/api/empresasmedicas`,
    fetcher
  );

  const router = useRouter();

  const handleRegisterNewCompanyOnClick = () =>
    router.push("/empresas-medicas/cadastrar");

  if (isLoading) return <Spinner />;

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Empresas médicas
      </Text>
      <Text>Todas as empresas médicas cadastradas na Lysi</Text>
      <TableContainer maxWidth="1032px" mt={5}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Razão Social</Th>
              <Th>CNPJ</Th>
              <Th>Sócios</Th>
              <Th>Ver detalhes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data && (
              <>
                {data.empresasMedicas.map((empresa) => (
                  <Tr key={empresa.Id}>
                    <Td>{empresa.RazaoSocial}</Td>
                    <Td>{formatCNPJ(empresa.Cnpj)}</Td>
                    <Td>Nome dos sócios</Td>
                    <Td>
                      <Button variant="ghost">
                        <PlusSquareIcon />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </>
            )}
          </Tbody>
        </Table>
        {data?.empresasMedicas.length === 0 && (
          <VStack mt={5}>
            <Text>Não há empresas médicas cadastradas</Text>
            <Button
              colorScheme="green"
              onClick={handleRegisterNewCompanyOnClick}
            >
              cadastrar nova empresa
            </Button>
          </VStack>
        )}
        {data && data.empresasMedicas.length > 0 && (
          <Flex
            mt={5}
            width="15%"
            justifyContent="space-between"
            alignItems="center"
          >
            Página:{" "}
            <Select ml={2}>
              {/* essa merda não funciona */}
              {Array.from({ length: data.totalPagina }, (x, i) => i + 1).map(
                (page) => (
                  <option value={page} key={page}>
                    {page}
                  </option>
                )
              )}
            </Select>
          </Flex>
        )}
        {data && data.empresasMedicas.length > 0 && (
          <Button
            colorScheme="green"
            onClick={handleRegisterNewCompanyOnClick}
            mt={5}
          >
            cadastrar nova empresa
          </Button>
        )}
      </TableContainer>
    </MainContent>
  );
}
