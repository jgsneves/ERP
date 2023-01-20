import {
  Button,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  handleSubmit: (file: File | null, fileName: string, type: string) => void;
  fileTypeOptions: string[];
}

export default function UploadFile({ handleSubmit, fileTypeOptions }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  ) => setFileName(event.target.value.trim().replace(" ", "-"));

  const handleTypeInputOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => setFileType(event.target.value);

  const handleSaveOnClick = () => {
    setIsLoading(true);
    handleSubmit(file, fileName, fileType);
    setFile(null);
    setFileName("");
    setIsLoading(false);
  };

  return (
    <VStack alignItems="flex-start" spacing={5} maxW="fit-content">
      <Text>Escolha o arquivo para salvar no servidor: </Text>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleInputFileOnChange}
      />
      <FormLabel>
        Nome do arquivo:
        <Input onChange={handleFileNameInputOnChange} isDisabled={isLoading} />
      </FormLabel>
      <FormLabel>
        Tipo do arquivo:
        <Select onChange={handleTypeInputOnChange} isDisabled={isLoading}>
          {fileTypeOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Select>
      </FormLabel>
      <Button
        colorScheme="green"
        onClick={handleSaveOnClick}
        isLoading={isLoading}
      >
        Salvar arquivo
      </Button>
    </VStack>
  );
}
