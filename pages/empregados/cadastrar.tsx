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
import { PessoasTipo, StatusAdmissao } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

interface FormData {
  Id: string;
  Tipo: PessoasTipo;
  Nome: string;
  Cpf: string;
  CriadoEm: Date;
  DataNascimento: Date;
  Salario: number;
  StatusAdmissao: StatusAdmissao;
}

export default function CadastrarEmpregado() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    Nome: "",
    Cpf: "",
    DataNascimento: new Date(),
    CriadoEm: new Date(),
    Id: uuidv4(),
    Tipo: "EMPREGADO",
    Salario: 0,
    StatusAdmissao: "EMPREGADO",
  });

  const router = useRouter();
  const toast = useToast();

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { id, value } = event.target;

    setFormData((partner) => {
      if (id === "Salario") {
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

  const formatDate = (date: Date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await axios
      .post("/api/empregados", formData)
      .catch((error: AxiosError) => {
        toast({
          title: "Erro na criação de empregado.",
          description: error.message,
          duration: 9000,
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/empregados");
        toast({
          title: "Empregado criado com sucesso!",
          duration: 9000,
          status: "success",
          isClosable: true,
        });
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

        <FormLabel mt="5">
          Cpf:
          <Input value={formData.Cpf} id="Cpf" onChange={handleInputOnChange} />
        </FormLabel>

        <FormLabel mt="5">
          Data de nascimento:
          <Input
            value={formatDate(formData.DataNascimento)}
            id="DataNascimento"
            type="date"
            onChange={handleInputOnChange}
          />
        </FormLabel>

        <FormLabel mt="5">
          Salário
          <Input
            value={formData.Salario?.toString()}
            type="number"
            id="Salario"
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