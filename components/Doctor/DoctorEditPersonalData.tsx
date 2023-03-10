import { formatCPF } from "@brazilian-utils/brazilian-utils";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { EstadoCivil, Pessoas } from "@prisma/client";
import axios from "axios";
import ContentTitle from "components/Shared/ContentTitle";
import { useRouter } from "next/router";
import { DoctorEntity } from "pages/medicos/[id]";
import { Dispatch, SetStateAction, useState } from "react";
import { CellphoneNumberFormat } from "utils/CellphoneNumberFormat";
import { DateFormat } from "utils/DateFormat";
import { ErrorHandler } from "utils/ErrorHandler";

interface Props {
  doctor: DoctorEntity;
  setIsEditState: Dispatch<SetStateAction<boolean>>;
}

export default function DoctorEditPersonalData({
  doctor,
  setIsEditState,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dateInputValue, setDateInputValue] = useState<string>(
    DateFormat.getChakraDateFormat(new Date(doctor.DataNascimento))
  );
  const [formData, setFormData] = useState<Pessoas>({
    Cpf: doctor.Cpf,
    Email: doctor.Email,
    EstadoCivil: doctor.EstadoCivil,
    Nacionalidade: doctor.Nacionalidade,
    PIS: doctor.PIS,
    RG: doctor.RG,
    TelefonePessoal: doctor.TelefonePessoal,
    TituloEleitor: doctor.TituloEleitor,
    CriadoEm: doctor.CriadoEm,
    Crm: doctor.Crm,
    DataNascimento: new Date(doctor.DataNascimento),
    EmpresaMedicaId: doctor.EmpresaMedicaId,
    EnderecoId: doctor.EnderecoId,
    Id: doctor.Id,
    ModificadoEm: new Date(),
    Nome: doctor.Nome,
    Participacao: null,
    Salario: null,
    StatusAdmissao: null,
    Tipo: "MEDICO",
    ModalidadeTrabalho: null,
  });

  const toast = useToast();
  const router = useRouter();

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
    setIsLoading(true);

    axios
      .patch(`/api/medicos/${doctor.Id}`, formData)
      .then(
        () => {
          toast({
            title: "Médico editado com sucesso!",
            duration: 5000,
            status: "success",
          });
        },
        () => {
          toast({
            title: "Não foi editar os dados do médico!",
            duration: 9000,
            isClosable: true,
            status: "error",
          });
        }
      )
      .catch((error) => ErrorHandler.logAxiosPatchError(error))
      .finally(() => {
        setIsLoading(false);
        router.reload();
      });
  };

  return (
    <VStack alignItems="flex-start">
      <ContentTitle title="Dados pessoais" />
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
        <Flex alignItems="center" mt={2} gap={3}>
          <Button
            isLoading={isLoading}
            colorScheme="green"
            onClick={handleSubmitOnClick}
          >
            salvar
          </Button>
          <Button
            variant="ghost"
            colorScheme="green"
            onClick={() => setIsEditState(false)}
          >
            cancelar
          </Button>
        </Flex>
      </FormControl>
    </VStack>
  );
}
