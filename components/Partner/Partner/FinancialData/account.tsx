import { Button, Text, useToast, VStack } from "@chakra-ui/react";
import { ContasCorrente } from "@prisma/client";
import { Spinner } from "@chakra-ui/react";
import useSWR from "swr";
import axios, { AxiosError } from "axios";

interface Props {
  accountId: string;
}

export default function Account({ accountId }: Props) {
  async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<JSON> {
    const res = await fetch(input, init);
    return res.json();
  }

  const { data, isLoading } = useSWR<ContasCorrente>(
    `/api/contascorrente/${accountId}`,
    fetcher
  );

  const toast = useToast();

  const handleDeleteOnClick = () => {
    axios
      .delete(`api/contascorrente/${accountId}`)
      .catch((error: AxiosError) =>
        toast({
          duration: 9000,
          title: "Não foi possível deletar esta conta.",
          description: error.message,
          isClosable: true,
          status: "error",
        })
      )
      .then();
  };

  if (isLoading) return <Spinner />;

  return (
    <VStack alignItems="flex-start" spacing={4}>
      <Text>Código do banco: {data?.CodigoBanco}</Text>
      <Text>Agência: {data?.Agencia}</Text>
      <Text>Dígito da agência: {data?.AgenciaDigito}</Text>
      <Text>Conta corrente: {data?.Conta}</Text>
      <Text>Dígito: da conta: {data?.ContaDigito}</Text>
      <Text>Chave PIX: {data?.ChavePix}</Text>
      <Text>Tipo de chave PIX: {data?.TipoChavePix}</Text>
      <Button colorScheme="red" onClick={handleDeleteOnClick}>
        Deletar conta
      </Button>
    </VStack>
  );
}
