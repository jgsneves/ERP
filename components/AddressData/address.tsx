import { Button, Text, VStack } from "@chakra-ui/react";
import { Enderecos } from "@prisma/client";
import { useState } from "react";
import EditAddress from "./editAddress";

interface Props {
  endereco: Enderecos;
}

enum ComponentState {
  EDIT,
  SHOW_DATA,
}

export default function Address({ endereco }: Props) {
  const [componentState, setComponentState] = useState<ComponentState>(
    ComponentState.SHOW_DATA
  );

  return (
    <>
      {componentState === ComponentState.SHOW_DATA ? (
        <VStack spacing={5} alignItems="flex-start">
          <Text>CEP: {endereco.Cep}</Text>
          <Text>Logradouro: {endereco.Logradouro}</Text>
          <Text>Complemento: {endereco.Complemento}</Text>
          <Text>Bairro: {endereco.Bairro}</Text>
          <Text>Cidade: {endereco.Cidade}</Text>
          <Text>Estado: {endereco.Estado}</Text>
          <Button
            onClick={() => setComponentState(ComponentState.EDIT)}
            mt={5}
            colorScheme="green"
          >
            Editar
          </Button>
        </VStack>
      ) : (
        <EditAddress endereco={endereco} />
      )}
    </>
  );
}
