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
  Button,
  Flex,
  Spinner,
  Text,
  Select,
  FormLabel,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { DocumentoTipo } from "@prisma/client";
import ErrorPage from "components/ErrorPage/ErrorPage";
import ContentTitle from "components/Shared/ContentTitle";
import { GetDocumentosResponse } from "pages/api/documentos";
import { useState } from "react";
import useSWR from "swr";
import { BoundedMutationHelper } from "utils/BoundedMutationHelper";
import { DateFormat } from "utils/DateFormat";
import { EnumFormat } from "utils/EnumFormat";
import { fetcher } from "utils/fetcher";

interface Props {
  isActive: boolean;
  employeeId: string;
}

export default function EmployeePerformanceTable({
  isActive,
  employeeId,
}: Props) {
  const [pagina, setPagina] = useState<number>(1);
  const [quantidade, setQuantidade] = useState<number>(5);
  const [documentType, setDocumentoType] = useState<DocumentoTipo>(
    DocumentoTipo.ATESTADO
  );

  const { data, isLoading, error, mutate } = useSWR<GetDocumentosResponse>(
    isActive
      ? `/api/documentos?pagina=${pagina}&quantidade=${quantidade}&tipo=${documentType}&pessoaId=${employeeId}`
      : null,
    fetcher
  );

  BoundedMutationHelper.setEmployeePerformanceTableMutator(mutate);

  const handleExternalLinkOnClick = (url: string) => {
    window.open(url, "_blank")?.focus();
  };

  if (error) return <ErrorPage />;

  if (isLoading)
    return (
      <Flex w="900px" alignItems="center" justifyContent="center" h="500px">
        <Spinner />
      </Flex>
    );

  return (
    <TableContainer w="900px" mb={5}>
      <ContentTitle title="Documentos" />
      <Flex>
        <FormLabel w="300px">
          Tipo de documento
          <Select
            value={documentType}
            onChange={(event) => {
              setDocumentoType(event.target.value as DocumentoTipo);
              setPagina(1);
            }}
          >
            <option value={DocumentoTipo.ATESTADO}>Atestado</option>
            <option value={DocumentoTipo.FOLHA_DE_PONTO_ASSINADA}>
              Folha de ponto
            </option>
          </Select>
        </FormLabel>
        <FormLabel w="300px">
          Quantidade por p??gina
          <Select
            value={quantidade}
            onChange={(event) => setQuantidade(parseInt(event.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Select>
        </FormLabel>
      </Flex>
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
        <Alert status="info" mt={2}>
          <AlertIcon />
          <Text>
            N??o h?? documentos cadastrados seguindo esses crit??rios de filtragem
          </Text>
        </Alert>
      )}

      {data && data.documentos.length > 0 && (
        <Flex mt={5} justifyContent="space-between" alignItems="center">
          <Button
            variant="ghost"
            isDisabled={pagina <= 1}
            onClick={() => setPagina((state) => state - 1)}
          >
            <ArrowLeftIcon boxSize={3} mr={2} />
            Anterior
          </Button>
          <Text>P??gina: {pagina}</Text>
          <Button
            variant="ghost"
            isDisabled={pagina === data.totalPaginas}
            onClick={() => setPagina((state) => state + 1)}
          >
            Pr??xima <ArrowRightIcon boxSize={3} ml={2} />
          </Button>
        </Flex>
      )}
    </TableContainer>
  );
}
