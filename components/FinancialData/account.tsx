import { Button, Text, useToast, VStack } from "@chakra-ui/react";
import { ContasCorrente } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  account: ContasCorrente;
}

export default function Account({ account }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const router = useRouter();

  const handleDeleteOnClick = async () => {
    setIsLoading(true);

    await axios
      .delete(`/api/contascorrente/${account.Id}`)
      .catch((error: AxiosError) => {
        toast({
          duration: 9000,
          title: "Não foi possível deletar esta conta.",
          description: error.message,
          isClosable: true,
          status: "error",
        });
      })
      .then(() => router.reload())
      .finally(() => setIsLoading(false));
  };

  return (
    <VStack alignItems="flex-start" spacing={4}>
      <Text>Código do banco: {account.CodigoBanco}</Text>
      <Text>Agência: {account.Agencia}</Text>
      <Text>Dígito da agência: {account.AgenciaDigito}</Text>
      <Text>Conta corrente: {account.Conta}</Text>
      <Text>Dígito: da conta: {account.ContaDigito}</Text>
      <Text>Chave PIX: {account.ChavePix}</Text>
      <Text>Tipo de chave PIX: {account.TipoChavePix}</Text>

      <Button
        colorScheme="red"
        onClick={handleDeleteOnClick}
        isLoading={isLoading}
      >
        deletar conta
      </Button>
    </VStack>
  );
}
