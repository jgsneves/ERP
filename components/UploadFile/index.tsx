import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DocumentoTipo } from "@prisma/client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState } from "react";

interface Props {
  handleSubmit: (file: File | null, fileName: string, type: string) => void;
  fileTypeOptions: (JSX.Element | null)[];
}

export default function UploadFile({ handleSubmit, fileTypeOptions }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fileInputValue, setFileInputValue] = useState<string | undefined>(
    undefined
  );

  const [fileName, setFileName] = useState<string>("");
  const [isInvalidFileName, setIsInvalidFileName] = useState<boolean>(false);

  const [fileType, setFileType] = useState<DocumentoTipo>("CONTRATO_SOCIAL");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supabaseClient = useSupabaseClient();

  const handleInputFileOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;
    if (files) {
      const pdfFile = files.item(0);
      setFile(pdfFile);
    }
  };

  const handleFileNameInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsInvalidFileName(false);
    setFileName(
      event.target.value.trim().replaceAll(" ", "-").toLocaleLowerCase()
    );
  };

  const handleTypeInputOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setFileType(value as DocumentoTipo);
  };

  const handleSaveOnClick = async () => {
    //TODO: terminar o método

    if (fileName === "") {
      setIsInvalidFileName(true);
    }

    if (file && fileName) {
      setIsLoading(true);
      const { data, error } = await supabaseClient.storage
        .from("empresas-medicas-documentos")
        .upload(fileName, file)
        .finally(() => {
          setFile(null);
          setFileName("");
          setIsLoading(false);
          setFileInputValue("");
        });
      console.log({ data, error });
    }
  };

  return (
    <VStack alignItems="flex-start" spacing={5} maxW="fit-content">
      <Text>Escolha o arquivo para salvar no servidor: </Text>
      <input
        value={fileInputValue}
        type="file"
        accept="application/pdf"
        onChange={handleInputFileOnChange}
      />
      <FormControl isInvalid={isInvalidFileName}>
        <FormLabel>
          Nome do arquivo:
          <Input
            value={fileName}
            onChange={handleFileNameInputOnChange}
            isDisabled={isLoading}
          />
          <FormErrorMessage>Insira um nome para o arquivo</FormErrorMessage>
        </FormLabel>
      </FormControl>
      <FormLabel>
        Tipo do arquivo:
        <Select
          onChange={handleTypeInputOnChange}
          isDisabled={isLoading}
          value={fileType}
        >
          {fileTypeOptions}
        </Select>
      </FormLabel>

      <Button
        colorScheme="green"
        onClick={handleSaveOnClick}
        isLoading={isLoading}
      >
        salvar arquivo
      </Button>
    </VStack>
  );
}
