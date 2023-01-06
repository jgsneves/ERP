import { Spinner, Text, VStack } from "@chakra-ui/react";
import { Enderecos } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

interface Props {
  addressId: string;
}

export default function Address({ addressId }: Props) {
  const { data, isLoading: fetchLoading } = useSWR<Enderecos>(
    `/api/enderecos/${addressId}`,
    fetcher
  );

  if (fetchLoading) return <Spinner />;
  return (
    <VStack spacing={5} alignItems="flex-start">
      <Text>CEP: {data?.Cep}</Text>
      <Text>Logradouro: {data?.Logradouro}</Text>
      <Text>Complemento: {data?.Complemento}</Text>
      <Text>Bairro: {data?.Bairro}</Text>
      <Text>Cidade: {data?.Cidade}</Text>
      <Text>Estado: {data?.Estado}</Text>
    </VStack>
  );
}
