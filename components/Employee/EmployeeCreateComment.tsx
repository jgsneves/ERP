import {
  Button,
  FormLabel,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { EmpregadosObservacoes } from "@prisma/client";
import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";
import axios from "axios";
import { BoundedMutationHelper } from "utils/BoundedMutationHelper";
import { ErrorHandler } from "utils/ErrorHandler";

interface Props {
  empregadoId: string;
}

const getInitialStateFormData = (empregadoId: string) => ({
  Conteudo: "",
  Data: new Date(),
  EmpregadoId: empregadoId,
  Id: uuid4(),
});

export default function EmployeeCreateComment({ empregadoId }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<EmpregadosObservacoes>(
    getInitialStateFormData(empregadoId)
  );

  const toast = useToast();
  const mutation = BoundedMutationHelper.getEmployeeObservacoesMutator();

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
          mutation();
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
      .finally(() => {
        setIsLoading(false);
        setFormData(getInitialStateFormData(empregadoId));
      });
  };

  return (
    <VStack w="100%" alignItems="flex-start">
      <FormLabel w="100%">
        Escreva uma nova observação
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
