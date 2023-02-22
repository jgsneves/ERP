import {
  Button,
  Flex,
  FormLabel,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import useSwr from "swr";
import { Documentos, DocumentoTipo } from "@prisma/client";
import Document from "components/Document";
import React, { useState } from "react";
import axios from "axios";
import { v4 } from "uuid";
import ContentTitle from "components/Shared/ContentTitle";
import { GetDocumentosResponse } from "pages/api/documentos";
import { UploadFileService } from "services/UploadFileService";
import { ErrorHandler } from "utils/ErrorHandler";
import { fetcher } from "utils/fetcher";

interface Props {
  empregadoId: string;
  empregadoNome: string;
  isActive: boolean;
}

export default function EmployeeContract({
  empregadoId,
  empregadoNome,
  isActive,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileInputName, setFileInputName] = useState<string | undefined>(
    undefined
  );

  const toast = useToast();

  const {
    data,
    isLoading: fetchLoading,
    error,
    mutate,
  } = useSwr<GetDocumentosResponse>(
    isActive
      ? `/api/documentos?pessoaId=${empregadoId}&tipo=${DocumentoTipo.CONTRATO_DE_TRABALHO_ASSINADO}`
      : null,
    fetcher
  );

  const handleInputFileOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (files) {
      const pdfFile = files.item(0);
      setFile(pdfFile);
    }
  };

  const handleSaveOnClick = async () => {
    setIsLoading(true);
    if (file) {
      const { url } = await UploadFileService.uploadFile(file);

      const postDocumentBody: Documentos = {
        Id: v4(),
        CriadoEm: new Date(),
        PessoaId: empregadoId,
        Nome: `contrato de trabalho de ${empregadoNome}`,
        Tipo: DocumentoTipo.CONTRATO_DE_TRABALHO_ASSINADO,
        Url: url,
        EmpresaMedicaId: null,
        ModificadoEm: null,
      };

      await axios
        .post(`/api/documentos`, postDocumentBody)
        .then(
          () => {
            toast({
              duration: 5000,
              status: "success",
              title: "Documento salvo com sucesso!",
              isClosable: true,
            });
            mutate();
          },
          () => {
            toast({
              duration: 9000,
              status: "error",
              title: "Não foi possível salvar o documento.",
              isClosable: true,
            });
          }
        )
        .catch((error) => ErrorHandler.logAxiosPostError(error))
        .finally(() => {
          setIsLoading(false);
          setFileInputName("");
          setFile(null);
        });
    }
  };

  return (
    <VStack w="600px" alignItems="flex-start">
      <ContentTitle title="Contrato de trabalho" />
      {fetchLoading && <Spinner />}
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
      {!data ||
        (data.documentos.length === 0 && (
          <>
            <FormLabel display="flex" flexDirection="column">
              Faça upload do arquivo
              <input
                type="file"
                accept="application/pdf"
                value={fileInputName}
                onChange={handleInputFileOnChange}
              />
            </FormLabel>
            <Button
              colorScheme="green"
              isLoading={isLoading}
              onClick={handleSaveOnClick}
            >
              salvar
            </Button>
          </>
        ))}
    </VStack>
  );
}
