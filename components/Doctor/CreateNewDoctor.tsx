import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { EstadoCivil, Pessoas } from "@prisma/client";
import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";
import { formatCPF } from "@brazilian-utils/brazilian-utils";
import axios from "axios";
import { useRouter } from "next/router";
import { DateFormat } from "utils/DateFormat";
import { ErrorHandler } from "utils/ErrorHandler";
import { CellphoneNumberFormat } from "utils/CellphoneNumberFormat";
import useCreateDoctorFormValidator from "hooks/useCreateDoctorFormValidator";

export default function CreateNewDoctor() {
  const [formData, setFormData] = useState<Pessoas>({
    Cpf: "",
    Email: "",
    EstadoCivil: "SOLTEIRO",
    Nacionalidade: "",
    PIS: "",
    RG: "",
    TelefonePessoal: "",
    TituloEleitor: "",
    CriadoEm: new Date(),
    Crm: "",
    DataNascimento: new Date(),
    EmpresaMedicaId: null,
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
  const {
    isCpfValid,
    isEmailValid,
    isFormValid,
    isNomeValid,
    verifyCpf,
    verifyEmail,
    verifyName,
    verifyForm,
  } = useCreateDoctorFormValidator(formData);

  const handleInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    verifyForm();

    if (isFormValid) {
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
            router.push("/medicos");
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
    }
  };

  return (
    <VStack alignItems="flex-start" maxW="500px">
      <FormControl isInvalid={!isNomeValid} isRequired>
        <FormLabel>Nome</FormLabel>
        <Input
          isDisabled={isLoading}
          value={formData.Nome}
          id="Nome"
          onChange={handleInputOnChange}
          onBlur={() => verifyName()}
        />
        {!isNomeValid && (
          <FormErrorMessage>Nome é um campo obrigatório.</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!isEmailValid} isRequired>
        <FormLabel>E-mail:</FormLabel>
        <Input
          value={formData.Email}
          id="Email"
          onChange={handleInputOnChange}
          type="email"
          onBlur={() => verifyEmail()}
        />
        {!isEmailValid && (
          <FormErrorMessage>Insira um e-mail válido.</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!isCpfValid} isRequired>
        <FormLabel>CPF</FormLabel>
        <Input
          isDisabled={isLoading}
          value={formatCPF(formData.Cpf)}
          id="Cpf"
          onChange={handleInputOnChange}
          onBlur={() => verifyCpf()}
        />
        {!isCpfValid && (
          <FormErrorMessage>Insira um CPF válido.</FormErrorMessage>
        )}
      </FormControl>
      <FormLabel>
        Telefone pessoal:
        <Input
          value={CellphoneNumberFormat.format(formData.TelefonePessoal)}
          id="TelefonePessoal"
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
        RG:
        <Input value={formData.RG} id="RG" onChange={handleInputOnChange} />
      </FormLabel>

      <FormLabel>
        PIS:
        <Input
          value={formData.PIS ?? ""}
          id="PIS"
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
      <FormLabel>
        Nacionalidade:
        <Input
          value={formData.Nacionalidade}
          id="Nacionalidade"
          onChange={handleInputOnChange}
        />
      </FormLabel>

      <FormLabel>
        Estado civil:
        <Select
          value={formData.EstadoCivil}
          onChange={handleInputOnChange}
          id="EstadoCivil"
        >
          {Object.values(EstadoCivil).map((estadoCivil) => (
            <option key={estadoCivil} value={estadoCivil}>
              {estadoCivil}
            </option>
          ))}
        </Select>
      </FormLabel>
      <Button
        isLoading={isLoading}
        colorScheme="green"
        mt={2}
        onClick={handleSubmitOnClick}
      >
        salvar
      </Button>
    </VStack>
  );
}
