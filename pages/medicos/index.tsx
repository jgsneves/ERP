import MainContent from "../../components/Containers/MainContent";
import {
  Button,
  Flex,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Pessoas } from "@prisma/client";
import { formatCPF } from "@brazilian-utils/brazilian-utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { MedicosResponse } from "../api/medicos";
import { useRouter } from "next/router";

export interface DoctorEntity
  extends Omit<
    Pessoas,
    "DataNascimento" | "Tipo" | "Participacao" | "Salario" | "StatusAdmissao"
  > {
  DataNascimento: string;
}

export default function Medicos() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageAmount, setPageAmount] = useState<number>(1);

  const router = useRouter();

  const { data, isLoading } = useSWR<MedicosResponse>(
    `/api/medicos/?pagina=${currentPage}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setCurrentPage(data.pagina);
      setPageAmount(data.totalPaginas);
    }
  }, [data]);

  const handleRowOnClick = (id: string) => {
    router.push(`/medicos/${id}`);
  };

  if (isLoading) return <Spinner />;

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Médicos
      </Text>
      <Text>Todas os médicos clientes da Lysi</Text>

      <TableContainer maxWidth="1032px" mt={5}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>CPF</Th>
              <Th>CRM</Th>
              <Th>Empresa</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data && (
              <>
                {data.doctors.map((doc) => (
                  <Tr
                    onClick={() => handleRowOnClick(doc.Id)}
                    key={doc.Id}
                    cursor="pointer"
                    _hover={{ outline: "2px solid black" }}
                  >
                    <Td>{doc.Nome}</Td>
                    <Td>{formatCPF(doc.Cpf)}</Td>
                    <Td>{doc.Crm}</Td>
                    <Td>{doc.EmpresaMedica.RazaoSocial}</Td>
                  </Tr>
                ))}
              </>
            )}
          </Tbody>
        </Table>

        {data && data.doctors.length > 0 && (
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
              isDisabled={currentPage === pageAmount}
              onClick={() => setCurrentPage((state) => state + 1)}
            >
              Próxima <ArrowRightIcon boxSize={3} ml={2} />
            </Button>
          </Flex>
        )}
      </TableContainer>
    </MainContent>
  );
}
