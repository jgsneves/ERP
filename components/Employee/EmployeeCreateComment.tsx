import {
  Button,
  FormLabel,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { EmpregadosObservacoes } from "@prisma/client";
import React, { useState } from "react";
import ContentTitle from "../Shared/ContentTitle";
import { v4 as uuid4 } from "uuid";
import axios from "axios";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { useRouter } from "next/router";

interface Props {
  empregadoId: string;
}

export default function EmployeeCreateComment({ empregadoId }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<EmpregadosObservacoes>({
    Conteudo: "",
    Data: new Date(),
    EmpregadoId: empregadoId,
    Id: uuid4(),
  });

  const toast = useToast();
  const router = useRouter();

  const handleInputOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setFormData((state) => ({ ...state, [id]: value }));
  };

  const handleSaveOnClick = () => {
    setIsLoading(true);
    axios
      .post(`/api/empregados-observacoes`, formData)
      .then(
        () => {
          toast({
            title: "Observação criada com sucesso!",
            status: "success",
            duration: 5000,
          });
          router.reload();
        },
        () => {
          toast({
            title: "Houve algum erro!",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      )
      .catch((error) => ErrorHandler.logAxiosPostError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <VStack w="100%" alignItems="flex-start">
      <ContentTitle title="Faça uma nova observação" />
      <FormLabel w="100%">
        Observação
        <Textarea
          value={formData.Conteudo}
          id="Conteudo"
          onChange={handleInputOnChange}
          resize="none"
          isDisabled={isLoading}
        />
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