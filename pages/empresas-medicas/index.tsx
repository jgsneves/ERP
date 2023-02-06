import MainContent from "../../components/Containers/MainContent";
import {
  Button,
  Flex,
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
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { EmpresasMedicasResponse } from "../api/empresas-medicas";
import { useRouter } from "next/router";
import { formatCNPJ } from "@brazilian-utils/brazilian-utils";
import { useState } from "react";

export default function EmpresasMedicasContainer() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quantidade, setQuantidade] = useState<number>(10);

  const { data, isLoading } = useSWR<EmpresasMedicasResponse>(
    `/api/empresas-medicas?pagina=${currentPage}&quantidade=${quantidade}`,
    fetcher
  );

  const router = useRouter();

  const handleRegisterNewCompanyOnClick = () =>
    router.push("/empresas-medicas/cadastrar");

  const handleRowOnClick = (id: string) => {
    router.push(`/empresas-medicas/${id}`);
  };

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
            </Tr>
          </Thead>
          <Tbody>
            {data && (
              <>
                {data.empresasMedicas.map((empresa) => (
                  <Tr
                    key={empresa.Id}
                    onClick={() => handleRowOnClick(empresa.Id)}
                    cursor="pointer"
                    _hover={{ outline: "2px solid black" }}
                  >
                    <Td>{empresa.RazaoSocial}</Td>
                    <Td>{formatCNPJ(empresa.Cnpj)}</Td>
                    <Td>
                      {empresa.Socios.reduce((prev, current) => {
                        if (prev === "") {
                          return current.Nome;
                        }
                        return `${prev}, ${current.Nome}`;
                      }, "")}
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
          <Flex mt={5} justifyContent="space-between" alignItems="center">
            <Button
              variant="ghost"
              isDisabled={currentPage <= 1}
              onClick={() => setCurrentPage((state) => state - 1)}
            >
              <ArrowLeftIcon boxSize={3} mr={2} />
              Anterior
            </Button>
            <Text>Página: {currentPage}</Text>
            <Button
              variant="ghost"
              isDisabled={currentPage === data.totalPaginas}
              onClick={() => setCurrentPage((state) => state + 1)}
            >
              Próxima <ArrowRightIcon boxSize={3} ml={2} />
            </Button>
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
