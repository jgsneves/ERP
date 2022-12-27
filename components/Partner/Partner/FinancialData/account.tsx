import { Text, VStack } from "@chakra-ui/react";
import { ContasCorrente } from "@prisma/client";
import { Spinner } from "@chakra-ui/react";
import useSWR from "swr";

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

  const { data, error, isLoading } = useSWR<ContasCorrente>(
    `/api/contascorrente/${accountId}`,
    fetcher
  );

  console.log(error);

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
    </VStack>
  );
}
