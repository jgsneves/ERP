import { Button, FormLabel, Select, useToast, VStack } from "@chakra-ui/react";
import { Documentos, DocumentoTipo } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { UploadFileService } from "services/UploadFileService";
import { BoundedMutationHelper } from "utils/BoundedMutationHelper";
import { EnumFormat } from "utils/EnumFormat";
import { ErrorHandler } from "utils/ErrorHandler";
import { v4 } from "uuid";

interface Props {
  empregadoId: string | null;
  empregadoNome?: string;
  empresaMedicaId: string | null;
  empresaMedica?: string;
  options: DocumentoTipo[];
}
export default function FileUpload({
  empregadoId,
  empresaMedicaId,
  empregadoNome,
  empresaMedica,
  options,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileInputName, setFileInputName] = useState<string | undefined>(
    undefined
  );
  const [fileType, setFileType] = useState<DocumentoTipo>(
    DocumentoTipo.ALTERACAO_DE_CONTRATO_SOCIAL
  );

  const toast = useToast();
  const mutation = BoundedMutationHelper.getEmployeeDocumentosMutator();

  const handleInputFileOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (files) {
      const pdfFile = files.item(0);
      setFile(pdfFile);
    }
  };

  const handleSelectOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value in DocumentoTipo) {
      setFileType(event.target.value as DocumentoTipo);
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
        Nome: `${EnumFormat.formatDocumentTypeEnum(fileType)} de ${
          empregadoNome ?? empresaMedica
        }`,
        Tipo: fileType,
        Url: url,
        EmpresaMedicaId: empresaMedicaId,
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
            mutation();
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
    <VStack alignItems="flex-start">
      <FormLabel display="flex" flexDirection="column">
        Faça upload do documento
        <input
          type="file"
          accept="application/pdf"
          value={fileInputName}
          onChange={handleInputFileOnChange}
        />
      </FormLabel>
      <FormLabel>
        Tipo de documento
        <Select value={fileType} onChange={handleSelectOnChange}>
          {options.map((documentoTipo) => (
            <option key={documentoTipo} value={documentoTipo}>
              {EnumFormat.formatDocumentTypeEnum(documentoTipo)}
            </option>
          ))}
        </Select>
      </FormLabel>
      <Button
        colorScheme="green"
        isLoading={isLoading}
        onClick={handleSaveOnClick}
      >
        salvar
      </Button>
    </VStack>
  );
}
