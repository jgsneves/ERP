import { formatCPF } from "@brazilian-utils/brazilian-utils";
import {
  Flex,
  VStack,
  Text,
  Button,
  FormLabel,
  Input,
  useToast,
  Select,
} from "@chakra-ui/react";
import { EstadoCivil, Pessoas } from "@prisma/client";
import axios from "axios";
import ContentTitle from "components/Shared/ContentTitle";
import { useRouter } from "next/router";
import { Employee } from "pages/empregados";
import React, { useState } from "react";
import { CellphoneNumberFormat } from "utils/CellphoneNumberFormat";
import { DateFormat } from "utils/DateFormat";
import { ErrorHandler } from "utils/ErrorHandler";
import EmployeeDocuments from "./EmployeeDocuments";
import EmployeeSalary from "./EmployeeSalary";
import EmployeeStatus from "./EmployeeStatus";
import EmployeeWorkType from "./EmployeeWorkType";

interface Props {
  employee: Employee;
  isActive: boolean;
}

export default function EmployeeSummary({ employee, isActive }: Props) {
  const [isEditState, setIsEditSate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<Pessoas>({
    Cpf: employee.Cpf,
    CriadoEm: new Date(employee.CriadoEm),
    Crm: null,
    Email: employee.Email,
    EstadoCivil: employee.EstadoCivil,
    Nacionalidade: employee.Nacionalidade,
    PIS: employee.PIS,
    RG: employee.RG,
    TelefonePessoal: employee.TelefonePessoal,
    TituloEleitor: employee.TituloEleitor,
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

  const handleInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
            title: "Altera????es salvas com sucesso!",
            status: "success",
          });
          router.reload();
        },
        () => {
          toast({
            duration: 9000,
            title: "N??o foi poss??vel salvar as altera????es",
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
            <FormLabel>
              Telefone pessoal:
              <Input
                value={CellphoneNumberFormat.format(formData.TelefonePessoal)}
                id="TelefonePessoal"
                onChange={handleInputOnChange}
              />
            </FormLabel>

            <FormLabel>
              E-mail:
              <Input
                value={formData.Email}
                id="Email"
                onChange={handleInputOnChange}
                type="email"
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
            <FormLabel>
              RG:
              <Input
                value={formData.RG}
                id="RG"
                onChange={handleInputOnChange}
              />
            </FormLabel>

            <FormLabel>
              PIS:
              <Input
                value={formData.PIS ?? ""}
                id="PIS"
                onChange={handleInputOnChange}
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
            <Text>Telefone Pessoal: {employee.TelefonePessoal}</Text>
            <Text>E-mail: {employee.Email}</Text>
            <Text>CPF: {employee.Cpf}</Text>
            <Text>RG: {employee.RG}</Text>
            <Text>PIS: {employee.PIS}</Text>
            <Text>
              Data de nascimento:{" "}
              {DateFormat.formatISODateStringToLocale(employee.DataNascimento)}
            </Text>
            <Text>Nacionalidade: {employee.Nacionalidade}</Text>
            <Text>Estado Civil: {employee.EstadoCivil}</Text>
            <Text>
              Data de admiss??o:{" "}
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
      <EmployeeDocuments
        empregadoId={employee.Id}
        empregadoNome={employee.Nome}
        isActive={isActive}
      />
    </Flex>
  );
}
