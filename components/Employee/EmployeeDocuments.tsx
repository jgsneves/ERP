import { Flex, Spinner, VStack } from "@chakra-ui/react";
import useSwr from "swr";
import Document from "components/Document";
import React from "react";
import ContentTitle from "components/Shared/ContentTitle";
import { GetDocumentosResponse } from "pages/api/documentos";
import { fetcher } from "utils/fetcher";
import { BoundedMutationHelper } from "utils/BoundedMutationHelper";
import ErrorPage from "components/ErrorPage/ErrorPage";
import FileUpload from "components/Document/fileUpload";
import { DocumentoTipo } from "@prisma/client";

interface Props {
  empregadoId: string;
  empregadoNome: string;
  isActive: boolean;
}

export default function EmployeeDocuments({
  empregadoId,
  empregadoNome,
  isActive,
}: Props) {
  const { data, isLoading, error, mutate } = useSwr<GetDocumentosResponse>(
    isActive
      ? `/api/documentos?pessoaId=${empregadoId}&tipo=${DocumentoTipo.CONTRATO_DE_TRABALHO_ASSINADO}&tipo=${DocumentoTipo.COMPROVANTE_ENDERECO}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  BoundedMutationHelper.setEmployeeDocumentosMutator(mutate);

  if (error) return <ErrorPage />;

  return (
    <VStack w="600px" alignItems="flex-start">
      <ContentTitle title="Documentos" />
      {isLoading && <Spinner />}

      {data && data.documentos.length > 0 && (
        <Flex gap={2}>
          {data.documentos.map((documento) => (
            <Document
              key={documento.Id}
              tipo={documento.Tipo}
              url={documento.Url}
            />
          ))}
        </Flex>
      )}

      <FileUpload
        empregadoId={empregadoId}
        empresaMedicaId={null}
        empregadoNome={empregadoNome}
        options={["COMPROVANTE_ENDERECO", "CONTRATO_DE_TRABALHO_ASSINADO"]}
      />
    </VStack>
  );
}
