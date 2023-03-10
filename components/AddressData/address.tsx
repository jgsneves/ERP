import { Button, Spinner, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import EditAddress from "./editAddress";
import useSwr from "swr";
import { Enderecos } from "@prisma/client";
import { fetcher } from "utils/fetcher";
import ErrorPage from "components/ErrorPage/ErrorPage";

interface Props {
  enderecoId: string;
  isActive: boolean;
}

export enum ComponentState {
  EDIT,
  SHOW_DATA,
}

export default function Address({ enderecoId, isActive }: Props) {
  const [componentState, setComponentState] = useState<ComponentState>(
    ComponentState.SHOW_DATA
  );

  const {
    data: endereco,
    isLoading,
    error,
  } = useSwr<Enderecos>(
    isActive ? `/api/enderecos/${enderecoId}` : null,
    fetcher
  );

  if (isLoading) return <Spinner colorScheme="green" />;

  if (error) return <ErrorPage />;

  return (
    <>
      {componentState === ComponentState.SHOW_DATA ? (
        <VStack spacing={5} alignItems="flex-start">
          <Text>CEP: {endereco?.Cep}</Text>
          <Text>Logradouro: {endereco?.Logradouro}</Text>
          <Text>Número: {endereco?.Numero}</Text>
          <Text>Complemento: {endereco?.Complemento}</Text>
          <Text>Bairro: {endereco?.Bairro}</Text>
          <Text>Cidade: {endereco?.Cidade}</Text>
          <Text>Estado: {endereco?.Estado}</Text>
          <Button
            onClick={() => setComponentState(ComponentState.EDIT)}
            mt={5}
            colorScheme="green"
          >
            editar
          </Button>
        </VStack>
      ) : (
        <EditAddress
          endereco={endereco}
          setComponentState={setComponentState}
        />
      )}
    </>
  );
}
