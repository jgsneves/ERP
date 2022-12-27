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
  partnerId: string;
}

export default function AccountForm({ partnerId }: Props) {
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
    TitularId: partnerId,
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
          router.push("/socios");
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
      <Text my={5}>
        Nenhuma conta encontrada para este sócio. Cadastre uma nova conta.
      </Text>
      <FormControl w={2 / 3}>
        <FormLabel>
          Código do banco:
          <Input
            onChange={handleInputOnChange}
            id="CodigoBanco"
            value={contaCorrente.CodigoBanco}
            type="number"
          />
        </FormLabel>
        <Divider my={8} />
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
        <Divider my={8} />
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
        <Divider my={8} />
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
