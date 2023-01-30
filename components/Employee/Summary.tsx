import { formatCPF } from "@brazilian-utils/brazilian-utils";
import {
  Flex,
  VStack,
  Text,
  Button,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Pessoas } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { EmployeeWithAccountAndAddress } from "../../pages/empregados/[id]";
import { DateFormat } from "../../utils/DateFormat";
import { ErrorHandler } from "../../utils/ErrorHandler";
import ContentTitle from "../Shared/ContentTitle";
import EmployeeContract from "./EmployeeContract";
import EmployeeSalary from "./EmployeeSalary";
import EmployeeStatus from "./EmployeeStatus";
import EmployeeWorkType from "./EmployeeWorkType";

interface Props {
  employee: EmployeeWithAccountAndAddress;
}

export default function Summary({ employee }: Props) {
  const [isEditState, setIsEditSate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<Pessoas>({
    Cpf: employee.Cpf,
    CriadoEm: new Date(employee.CriadoEm),
    Crm: null,
    DataNascimento: new Date(employee.DataNascimento),
    EmpresaMedicaId: null,
    EnderecoId: employee.EnderecoId,
    Id: employee.Id,
    ModificadoEm: new Date(),
    Nome: employee.Nome,
    Participacao: null,
    Salario: employee.Salario,
    StatusAdmissao: employee.StatusAdmissao,
    Tipo: "EMPREGADO",
    ModalidadeTrabalho: employee.ModalidadeTrabalho,
  });

  const [dateInputValue, setDateInputValue] = useState<string>(
    DateFormat.getChakraDateFormat(formData.DataNascimento)
  );

  const toast = useToast();
  const router = useRouter();

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((state) => ({ ...state, [id]: value }));
  };

  const handleDateInputOnBlur = () => {
    if (dateInputValue) {
      const date = DateFormat.getDateTypeFromChakraString(dateInputValue);
      setFormData((state) => ({ ...state, DataNascimento: date }));
    }
  };

  const handleSubmitOnClick = () => {
    setIsLoading(true);

    axios
      .patch(`/api/empregados/${employee.Id}`, formData)
      .then(
        () => {
          toast({
            duration: 5000,
            title: "Alterações salvas com sucesso!",
            status: "success",
          });
          router.reload();
        },
        () => {
          toast({
            duration: 9000,
            title: "Não foi possível salvar as alterações",
            status: "error",
            isClosable: true,
          });
        }
      )
      .catch((error) => ErrorHandler.logAxiosPatchError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <Flex wrap="wrap" gap={4} justifyContent="space-between">
      <VStack alignItems="flex-start" spacing={4} w="300px">
        <ContentTitle title="Dados pessoais" />
        {isEditState ? (
          <>
            <FormLabel w="100%">
              Nome
              <Input
                id="Nome"
                value={formData.Nome}
                onChange={handleInputOnChange}
                isDisabled={isLoading}
              />
            </FormLabel>
            <FormLabel w="100%">
              Cpf
              <Input
                id="Cpf"
                value={formatCPF(formData.Cpf)}
                onChange={handleInputOnChange}
                isDisabled={isLoading}
              />
            </FormLabel>
            <FormLabel w="100%">
              Data de nascimento
              <Input
                type="date"
                value={dateInputValue}
                onChange={(event) => setDateInputValue(event.target.value)}
                onBlur={handleDateInputOnBlur}
                isDisabled={isLoading}
              />
            </FormLabel>
            <Flex w="100%" justifyContent="space-between">
              <Button
                colorScheme="green"
                isLoading={isLoading}
                onClick={handleSubmitOnClick}
              >
                salvar
              </Button>
              <Button
                colorScheme="green"
                variant="ghost"
                onClick={() => setIsEditSate(false)}
              >
                cancelar
              </Button>
            </Flex>
          </>
        ) : (
          <>
            <Text>Nome: {employee.Nome}</Text>
            <Text>CPF: {employee.Cpf}</Text>
            <Text>
              Data de nascimento:{" "}
              {DateFormat.formatISODateStringToLocale(employee.DataNascimento)}
            </Text>
            <Text>
              Data de admissão:{" "}
              {DateFormat.formatISODateStringToLocale(employee.CriadoEm)}
            </Text>
            <Button colorScheme="green" onClick={() => setIsEditSate(true)}>
              editar
            </Button>
          </>
        )}
      </VStack>

      <EmployeeSalary salary={employee.Salario} />
      <EmployeeStatus
        statusAdmissao={employee.StatusAdmissao}
        id={employee.Id}
      />
      <EmployeeWorkType type={employee.ModalidadeTrabalho} id={employee.Id} />
      <EmployeeContract />
    </Flex>
  );
}
