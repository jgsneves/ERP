import MainContent from "../../components/Containers/MainContent";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { PessoasTipo } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { DateFormat } from "../../utils/DateFormat";

interface FormData {
  Id: string;
  Tipo: PessoasTipo;
  Nome: string;
  Cpf: string;
  CriadoEm: Date;
  DataNascimento: Date;
  Participacao: number;
}

export default function CadastrarSocio() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [birthDateValue, setBirthDateValue] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    Nome: "",
    Cpf: "",
    DataNascimento: new Date(),
    CriadoEm: new Date(),
    Id: uuidv4(),
    Tipo: "SOCIO",
    Participacao: 0,
  });

  const router = useRouter();
  const toast = useToast();

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { id, value } = event.target;

    setFormData((partner) => {
      if (id === "Participacao") {
        return {
          ...partner,
          [id]: Number(value),
        };
      }
      return {
        ...partner,
        [id]: value,
      };
    });
  };

  const handleDateInputOnBlur = () => {
    if (birthDateValue) {
      const date = DateFormat.getDateTypeFromChakraString(birthDateValue);
      setFormData((state) => ({ ...state, DataNascimento: date }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await axios
      .post("/api/socios", formData)
      .catch((error: AxiosError) =>
        toast({
          status: "error",
          title: "Não foi possível cadastrar novo sócio.",
          description: error.message,
          duration: 9000,
        })
      )
      .finally(() => {
        setIsLoading(false);
        router.push("/socios");
      });
  };

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Cadastrar novo sócio
      </Text>
      <Text>Preencha todos os dados abaixo.</Text>

      <Link href="/socios">
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

        <FormLabel mt="5">
          Cpf:
          <Input value={formData.Cpf} id="Cpf" onChange={handleInputOnChange} />
        </FormLabel>

        <FormLabel mt="5">
          Data de nascimento:
          <Input
            value={birthDateValue}
            id="DataNascimento"
            type="date"
            onChange={(event) => setBirthDateValue(event.target.value)}
            onBlur={handleDateInputOnBlur}
          />
        </FormLabel>

        <FormLabel mt="5">
          Cota societária:
          <Input
            value={formData.Participacao?.toString()}
            type="number"
            id="Participacao"
            onChange={handleInputOnChange}
          />
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
