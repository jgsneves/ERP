import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Pessoas } from "@prisma/client";
import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";
import { formatCPF } from "@brazilian-utils/brazilian-utils";
import { DateFormat } from "../../utils/DateFormat";
import axios from "axios";
import { useRouter } from "next/router";
import { ErrorHandler } from "../../utils/ErrorHandler";

interface Props {
  empresaId: string;
}

export default function CreateNewDoctor({ empresaId }: Props) {
  const [formData, setFormData] = useState<Pessoas>({
    Cpf: "",
    CriadoEm: new Date(),
    Crm: "",
    DataNascimento: new Date(),
    EmpresaMedicaId: empresaId,
    EnderecoId: null,
    Id: uuid4(),
    ModificadoEm: null,
    Nome: "",
    Participacao: null,
    Salario: null,
    StatusAdmissao: null,
    Tipo: "MEDICO",
    ModalidadeTrabalho: null,
  });
  const [dateInputValue, setDateInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const router = useRouter();

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((state) => ({ ...state, [id]: value }));
  };

  const handleDateOnBlur = () => {
    if (dateInputValue) {
      const date = DateFormat.getDateTypeFromChakraString(dateInputValue);
      setFormData((state) => ({ ...state, DataNascimento: date }));
    }
  };

  const handleSubmitOnClick = () => {
    setIsLoading(true);

    axios
      .post("/api/medicos", formData)
      .then(
        () => {
          toast({
            title: "Médico criado com sucesso!",
            duration: 5000,
            status: "success",
          });
          router.reload();
        },
        () => {
          toast({
            title: "Não foi possível criar um novo médico!",
            duration: 9000,
            isClosable: true,
            status: "error",
          });
        }
      )
      .catch((error) => ErrorHandler.logAxiosPostError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <VStack alignItems="flex-start">
      <FormControl maxW="500px">
        <FormLabel>
          Nome
          <Input
            isDisabled={isLoading}
            value={formData.Nome}
            id="Nome"
            onChange={handleInputOnChange}
          />
        </FormLabel>
        <FormLabel>
          CPF
          <Input
            isDisabled={isLoading}
            value={formatCPF(formData.Cpf)}
            id="Cpf"
            onChange={handleInputOnChange}
          />
        </FormLabel>
        <FormLabel>
          CRM
          <Input
            isDisabled={isLoading}
            value={formData.Crm ?? ""}
            id="Crm"
            onChange={handleInputOnChange}
          />
        </FormLabel>
        <FormLabel>
          Date de nascimento
          <Input
            isDisabled={isLoading}
            type="date"
            value={dateInputValue}
            onChange={(event) => setDateInputValue(event.target.value)}
            onBlur={handleDateOnBlur}
          />
        </FormLabel>
        <Button
          isLoading={isLoading}
          colorScheme="green"
          mt={2}
          onClick={handleSubmitOnClick}
        >
          salvar
        </Button>
      </FormControl>
    </VStack>
  );
}
