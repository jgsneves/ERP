import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  VStack,
  Button,
  Flex,
  Spinner,
  Text,
  Select,
  FormLabel,
} from "@chakra-ui/react";
import { DocumentoTipo } from "@prisma/client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { GetDocumentosResponse } from "../../pages/api/documentos";
import { DateFormat } from "../../utils/DateFormat";
import { EnumFormat } from "../../utils/EnumFormat";
import { fetcher } from "../../utils/fetcher";
import ContentTitle from "../Shared/ContentTitle";

export default function EmployeePerformanceTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageAmount, setPageAmount] = useState<number>(1);
  const [documentType, setDocumentoType] = useState<DocumentoTipo>(
    DocumentoTipo.ATESTADO
  );

  const { data, isLoading } = useSWR<GetDocumentosResponse>(
    `/api/documentos?pagina=${currentPage}&tipo=${documentType}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setCurrentPage(data.pagina);
      setPageAmount(data.totalPaginas);
    }
  }, [data]);

  const handleExternalLinkOnClick = (url: string) => {
    window.open(url, "_blank")?.focus();
  };

  if (isLoading) return <Spinner />;
  return (
    <TableContainer w="983px" mt={5}>
      <ContentTitle title="Filtros" />
      <FormLabel w="300px">
        Tipo de documento
        <Select
          value={documentType}
          onChange={(event) =>
            setDocumentoType(event.target.value as DocumentoTipo)
          }
        >
          <option value={DocumentoTipo.ATESTADO}>Atestado</option>
          <option value={DocumentoTipo.FOLHA_DE_PONTO_ASSINADA}>
            Folha de ponto
          </option>
        </Select>
      </FormLabel>
      <ContentTitle title="Documentos" />
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Data</Th>
            <Th>Tipo</Th>
            <Th>Abrir documento</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data && (
            <>
              {data.documentos.map((documento) => (
                <Tr key={documento.Id}>
                  <Td>{documento.Nome}</Td>
                  <Td>
                    {DateFormat.formatISODateStringToLocale(documento.CriadoEm)}
                  </Td>
                  <Td>{EnumFormat.formatDocumentTypeEnum(documento.Tipo)}</Td>
                  <Td>
                    <Button
                      onClick={() => handleExternalLinkOnClick(documento.Url)}
                    >
                      <ExternalLinkIcon />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </>
          )}
        </Tbody>
      </Table>

      {data?.documentos.length === 0 && (
        <Text>Não há documentos cadastrados</Text>
      )}

      {data && data.documentos.length > 0 && (
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
  );
}
