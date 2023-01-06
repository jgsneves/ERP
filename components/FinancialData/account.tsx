import { Button, Text, useToast, VStack } from "@chakra-ui/react";
import { ContasCorrente } from "@prisma/client";
import { Spinner } from "@chakra-ui/react";
import useSWR from "swr";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { fetcher } from "../../utils/fetcher";

interface Props {
  accountId: string;
  pessoaId?: string;
  empresaMedicaId?: string;
}

export default function Account({
  accountId,
  pessoaId,
  empresaMedicaId,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, isLoading: fetchLoading } = useSWR<ContasCorrente>(
    `/api/contascorrente/${accountId}`,
    fetcher
  );

  const toast = useToast();
  const router = useRouter();

  const handleDeleteOnClick = async () => {
    setIsLoading(true);

    await axios
      .delete(`/api/contascorrente/${accountId}`)
      .catch((error: AxiosError) => {
        toast({
          duration: 9000,
          title: "Não foi possível deletar esta conta.",
          description: error.message,
          isClosable: true,
          status: "error",
        });
      })
      .then(() => {
        if (pessoaId) {
          router.push(`/socios/${pessoaId}`);
        } else if (empresaMedicaId) {
          router.push(`/empresas-medicas/${empresaMedicaId}`);
        }
      })
      .finally(() => setIsLoading(false));
  };

  if (fetchLoading) return <Spinner />;

  return (
    <VStack alignItems="flex-start" spacing={4}>
      <Text>Código do banco: {data?.CodigoBanco}</Text>
      <Text>Agência: {data?.Agencia}</Text>
      <Text>Dígito da agência: {data?.AgenciaDigito}</Text>
      <Text>Conta corrente: {data?.Conta}</Text>
      <Text>Dígito: da conta: {data?.ContaDigito}</Text>
      <Text>Chave PIX: {data?.ChavePix}</Text>
      <Text>Tipo de chave PIX: {data?.TipoChavePix}</Text>

      <Button
        colorScheme="red"
        onClick={handleDeleteOnClick}
        isLoading={isLoading}
      >
        Deletar conta
      </Button>
    </VStack>
  );
}
