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
import { DateFormat } from "../../utils/dateFormat";
import axios from "axios";
import { useRouter } from "next/router";

interface Props {
  empresaId: string;
}

export default function CreateNewDoctor({ empresaId }: Props) {
  const [formData, setFormData] = useState<Pessoas>({
    ContaCorrenteId: null,
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

  const handleSubmitOnClick = async () => {
    setIsLoading(true);

    await axios
      .post("/api/medicos", formData)
      .then(() => {
        toast({
          title: "Médico criado com sucesso!",
          duration: 5000,
          status: "success",
        });
        router.reload();
      })
      .catch((error) =>
        toast({
          title: "Não foi possível criar um novo médico!",
          description: error,
          duration: 9000,
          isClosable: true,
          status: "error",
        })
      )
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
