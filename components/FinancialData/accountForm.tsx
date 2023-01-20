import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ContasCorrente, TipoChavePix } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";

interface Props {
  pessoaId?: string;
  empresaMedicaId?: string;
}

export default function AccountForm({ pessoaId, empresaMedicaId }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contaCorrente, setContaCorrente] = useState<ContasCorrente>({
    Agencia: 0,
    AgenciaDigito: 0,
    ChavePix: null,
    CodigoBanco: 0,
    Conta: 0,
    ContaDigito: 0,
    CriadoEm: new Date(),
    Id: uuid4(),
    TipoChavePix: TipoChavePix.EMAIL,
    ModificadoEm: null,
    TitularId: pessoaId ?? null,
    EmpresaTitularId: empresaMedicaId ?? null,
  });

  const router = useRouter();
  const toast = useToast();

  const handleInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setContaCorrente((state) => {
      if (id === "TipoChavePix") {
        return {
          ...state,
          [id]: parseTipoChavePixEnum(value),
        };
      } else {
        return {
          ...state,
          [id]: value,
        };
      }
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await axios
      .post<ContasCorrente>(`/api/contascorrente`, contaCorrente)
      .catch((error: AxiosError) => {
        toast({
          title: "Erro na criação de conta corrente.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      })
      .then((contaCorrente) => {
        if (contaCorrente) {
          toast({
            title: "Conta corrente criada com sucesso!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          if (pessoaId) {
            router.push(`/socios/${pessoaId}`);
          } else if (empresaMedicaId) {
            router.push(`/empresas-medicas/${empresaMedicaId}`);
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const parseTipoChavePixEnum = (tipo: string): TipoChavePix => {
    switch (tipo) {
      case "CPF":
        return TipoChavePix.CPF;
      case "TELEFONE":
        return TipoChavePix.TELEFONE;
      case "EMAIL":
        return TipoChavePix.EMAIL;
      case "HASH":
        return TipoChavePix.HASH;
      default:
        return TipoChavePix.CPF;
    }
  };

  return (
    <VStack alignItems="flex-start">
      <Text my={5}>Nenhuma conta encontrada. Cadastre uma nova conta.</Text>
      <FormControl width="500px">
        <FormLabel>
          Código do banco:
          <Input
            onChange={handleInputOnChange}
            id="CodigoBanco"
            value={contaCorrente.CodigoBanco}
            type="number"
          />
        </FormLabel>
        <Flex>
          <FormLabel>
            Agência:
            <Input
              onChange={handleInputOnChange}
              id="Agencia"
              value={contaCorrente.Agencia}
              type="number"
            />
          </FormLabel>
          <FormLabel>
            Dígito da agência:
            <Input
              onChange={handleInputOnChange}
              id="AgenciaDigito"
              value={contaCorrente.AgenciaDigito}
              type="number"
            />
          </FormLabel>
        </Flex>
        <Flex>
          <FormLabel>
            Conta corrente:
            <Input
              onChange={handleInputOnChange}
              id="Conta"
              value={contaCorrente.Conta}
              type="number"
            />
          </FormLabel>
          <FormLabel>
            Dígito da conta corrente:
            <Input
              onChange={handleInputOnChange}
              id="ContaDigito"
              value={contaCorrente.ContaDigito}
              type="number"
            />
          </FormLabel>
        </Flex>
        <Flex>
          <FormLabel>
            Chave Pix:
            <Input
              onChange={handleInputOnChange}
              id="ChavePix"
              value={contaCorrente.ChavePix ?? undefined}
            />
          </FormLabel>
          <FormLabel>
            Tipo de Chave Pix:
            <Select
              id="TipoChavePix"
              onChange={handleInputOnChange}
              value={contaCorrente.TipoChavePix ?? undefined}
            >
              <option value="EMAIL">Email</option>
              <option value="TELEFONE">Telefone</option>
              <option value="CPF">Cpf</option>
              <option value="HASH">Chave aleatória</option>
            </Select>
          </FormLabel>
        </Flex>
        <Button
          colorScheme="green"
          mt={2}
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </FormControl>
    </VStack>
  );
}
