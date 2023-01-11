import { Button, Spinner, Text, VStack } from "@chakra-ui/react";
import { Enderecos } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { AddressDataState } from ".";
import { fetcher } from "../../utils/fetcher";
import useSWR from "swr";

interface Props {
  addressId: string | null;
  setState: Dispatch<SetStateAction<AddressDataState>>;
}

export default function Address({ addressId, setState }: Props) {
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
      <Button onClick={() => setState("edit")} mt={5} colorScheme="green">
        Editar
      </Button>
    </VStack>
  );
}
