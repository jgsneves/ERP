import MainContent from "components/Containers/MainContent";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { EstadoCivil, ModalidadeTrabalho, Pessoas } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/router";
import { formatCPF } from "@brazilian-utils/brazilian-utils";
import { DateFormat } from "utils/DateFormat";
import { ErrorHandler } from "utils/ErrorHandler";
import { CurrencyFormat } from "utils/CurrencyFormat";
import { parseCurrency } from "@brazilian-utils/brazilian-utils";
import { CellphoneNumberFormat } from "utils/CellphoneNumberFormat";

interface Empregado extends Omit<Pessoas, "Salario"> {
  Salario: string;
}

export default function CadastrarEmpregado() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [birthDateValue, setBirthDateValue] = useState<string>("");
  const [formData, setFormData] = useState<Empregado>({
    Nome: "",
    Cpf: "",
    Email: "",
    EstadoCivil: "SOLTEIRO",
    Nacionalidade: "",
    PIS: "",
    RG: "",
    TelefonePessoal: "",
    TituloEleitor: "",
    DataNascimento: new Date(),
    CriadoEm: new Date(),
    Id: uuidv4(),
    Tipo: "EMPREGADO",
    Salario: "150000",
    StatusAdmissao: "EXPERIENCIA",
    Crm: null,
    EmpresaMedicaId: null,
    EnderecoId: null,
    ModalidadeTrabalho: "PRESENCIAL",
    ModificadoEm: null,
    Participacao: null,
  });

  const router = useRouter();
  const toast = useToast();

  const handleInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();
    const { id, value } = event.target;

    setFormData((state) => ({ ...state, [id]: value }));
  };

  const handleDateInputOnBlur = () => {
    if (birthDateValue) {
      const date = DateFormat.getDateTypeFromChakraString(birthDateValue);
      setFormData((state) => ({ ...state, DataNascimento: date }));
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post("/api/empregados", {
        ...formData,
        Salario: parseCurrency(formData.Salario),
      })
      .then(
        () => {
          toast({
            title: "Empregado criado com sucesso!",
            duration: 9000,
            status: "success",
            isClosable: true,
          });
          router.push("/empregados");
        },
        () => {
          toast({
            title: "Erro na criação de empregado.",
            duration: 9000,
            status: "error",
            isClosable: true,
          });
        }
      )
      .catch((error) => ErrorHandler.logAxiosPostError(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Cadastrar novo empregado
      </Text>
      <Text>Preencha todos os dados abaixo.</Text>

      <Link href="/empregados">
        <ArrowBackIcon boxSize={8} mt="6" cursor="pointer" />
      </Link>

      <FormControl maxW="500px" mt="14">
        <FormLabel>
          Nome:
          <Input
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
          Cpf:
          <Input
            value={formatCPF(formData.Cpf)}
            id="Cpf"
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
          Data de nascimento:
          <Input
            value={birthDateValue}
            id="DataNascimento"
            type="date"
            onChange={(event) => setBirthDateValue(event.target.value)}
            onBlur={handleDateInputOnBlur}
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

        <FormLabel>
          Salário (R$)
          <Input
            value={CurrencyFormat.moneyMask(formData.Salario)}
            id="Salario"
            onChange={handleInputOnChange}
          />
        </FormLabel>

        <FormLabel>
          Modalidade de trabalho
          <Select
            value={formData.ModalidadeTrabalho ?? ""}
            id="ModalidadeTrabalho"
            onChange={handleInputOnChange}
          >
            <option value={ModalidadeTrabalho.PRESENCIAL}>Presencial</option>
            <option value={ModalidadeTrabalho.REMOTO}>Remoto</option>
            <option value={ModalidadeTrabalho.HIBRIDO}>Híbrido</option>
          </Select>
        </FormLabel>

        <Button
          colorScheme="green"
          mt="10"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Cadastrar
        </Button>
      </FormControl>
    </MainContent>
  );
}
