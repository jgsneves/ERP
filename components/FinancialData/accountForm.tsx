import {
  Button,
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
import { BrasilApi } from "../../services/BrasilApi";
import { ErrorHandler } from "../../utils/ErrorHandler";

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
    PessoaId: pessoaId ?? null,
    EmpresaMedicaId: empresaMedicaId ?? null,
    NomeBanco: "",
  });

  const router = useRouter();
  const toast = useToast();

  const handleInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setContaCorrente((state) => ({ ...state, [id]: value }));
  };

  const handleCodigoDoBancoOnBlur = async () => {
    setIsLoading(true);
    await BrasilApi.getBank(contaCorrente.CodigoBanco)
      .then(
        (response) =>
          setContaCorrente((state) => ({
            ...state,
            NomeBanco: response.data.fullName,
          })),
        () =>
          toast({
            title: "Não foi encontrado nenhum banco com este código.",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
      )
      .catch((error) => ErrorHandler.logBrasilApiError(error))
      .finally(() => setIsLoading(false));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post(`/api/contascorrente`, contaCorrente)
      .then(
        () => {
          toast({
            title: "Conta corrente criada com sucesso!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          router.reload();
        },
        () =>
          toast({
            title: "Erro na criação de conta corrente.",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
      )
      .catch((error: AxiosError) => ErrorHandler.logAxiosPostError(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Flex gap={5} wrap="wrap" justifyItems="space-between" w="950px">
        <FormLabel width="150px">
          Código do banco:
          <Input
            isDisabled={isLoading}
            onChange={handleInputOnChange}
            onBlur={handleCodigoDoBancoOnBlur}
            id="CodigoBanco"
            value={contaCorrente.CodigoBanco}
            type="number"
          />
        </FormLabel>
        <FormLabel>
          Nome do banco:
          <Input
            isDisabled={isLoading}
            onChange={handleInputOnChange}
            id="NomeBanco"
            value={contaCorrente.NomeBanco}
          />
        </FormLabel>
        <Flex>
          <FormLabel width="150px">
            Agência:
            <Input
              isDisabled={isLoading}
              onChange={handleInputOnChange}
              id="Agencia"
              value={contaCorrente.Agencia}
              type="number"
            />
          </FormLabel>
          <FormLabel width="150px">
            Dígito da agência:
            <Input
              isDisabled={isLoading}
              onChange={handleInputOnChange}
              id="AgenciaDigito"
              value={contaCorrente.AgenciaDigito}
              type="number"
            />
          </FormLabel>
        </Flex>
        <Flex>
          <FormLabel width="150px">
            Conta corrente:
            <Input
              isDisabled={isLoading}
              onChange={handleInputOnChange}
              id="Conta"
              value={contaCorrente.Conta}
              type="number"
            />
          </FormLabel>
          <FormLabel width="150px">
            Dígito da conta:
            <Input
              isDisabled={isLoading}
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
              isDisabled={isLoading}
              onChange={handleInputOnChange}
              id="ChavePix"
              value={contaCorrente.ChavePix ?? ""}
            />
          </FormLabel>
          <FormLabel>
            Tipo de Chave Pix:
            <Select
              id="TipoChavePix"
              onChange={handleInputOnChange}
              value={contaCorrente.TipoChavePix ?? ""}
            >
              <option value={TipoChavePix.EMAIL}>Email</option>
              <option value={TipoChavePix.TELEFONE}>Telefone</option>
              <option value={TipoChavePix.CPF}>Cpf</option>
              <option value={TipoChavePix.HASH}>Chave aleatória</option>
            </Select>
          </FormLabel>
        </Flex>
      </Flex>
      <Button
        colorScheme="green"
        mt={2}
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        salvar
      </Button>
    </>
  );
}
