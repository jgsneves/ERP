import { Button, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  handleSubmit: (file: File | null, fileName: string) => Promise<void>;
}

export default function UploadFile({ handleSubmit }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
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

  const handleSaveOnClick = async () => {
    setIsLoading(true);
    await handleSubmit(file, fileName);
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
      <Button
        colorScheme="green"
        onClick={handleSaveOnClick}
        isDisabled={isLoading}
      >
        Salvar arquivo
      </Button>
    </VStack>
  );
}
