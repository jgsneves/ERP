import { isValidCEP } from "@brazilian-utils/brazilian-utils";
import {
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { Enderecos } from "@prisma/client";
import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BrasilApi } from "../../services/BrasilApi";
import { useRouter } from "next/router";
import { ErrorHandler } from "../../utils/ErrorHandler";
import { ComponentState } from "./address";

interface Props {
  endereco: Enderecos | undefined;
  setComponentState: Dispatch<SetStateAction<ComponentState>>;
}

export default function EditAddress({ endereco, setComponentState }: Props) {
  const {
    Bairro,
    Cep,
    Cidade,
    Complemento,
    CriadoEm,
    EmpresaMedicaId,
    Estado,
    Id,
    Logradouro,
    PessoaId,
    Numero,
  } = endereco!;

  const [formData, setFormData] = useState<Enderecos>({
    Bairro,
    Cep,
    Cidade,
    Complemento,
    CriadoEm,
    Estado,
    Id,
    Logradouro,
    Numero,
    ModificadoEm: new Date(),
    PessoaId: PessoaId ?? null,
    EmpresaMedicaId: EmpresaMedicaId ?? null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const router = useRouter();

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { id, value } = event.target;
    setFormData((state) => ({ ...state, [id]: value }));
  };

  const handleOnBlur = async () => {
    if (isValidCEP(formData.Cep)) {
      setIsLoading(true);
      const cep = await BrasilApi.getCep(Number(formData.Cep));
      const { city, neighborhood, state: cepState, street } = cep.data;
      setFormData((state) => ({
        ...state,
        Bairro: neighborhood,
        Cidade: city,
        Estado: cepState,
        Logradouro: street,
      }));
      setIsLoading(false);
    }
  };

  const handleOnClick = () => {
    setIsLoading(true);

    axios
      .put(`/api/enderecos/${Id}`, formData)
      .then(
        () => {
          toast({
            status: "success",
            title: "Endereço salvo com sucesso!",
            duration: 5000,
          });
          router.reload();
        },
        () => {
          toast({
            duration: 9000,
            title: "Não foi possível salvar o endereço!",
            status: "error",
            isClosable: true,
          });
        }
      )
      .catch((error) => ErrorHandler.logAxiosPutError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <VStack spacing={5} alignItems="flex-start">
      <Text my={5}>Informe os dados de endereço.</Text>
      <FormControl>
        <FormLabel>
          CEP (apenas os números):
          <Input
            isDisabled={isLoading}
            type="number"
            id="Cep"
            value={formData.Cep}
            onChange={handleInputOnChange}
            onBlur={handleOnBlur}
          />
        </FormLabel>
        <FormLabel>
          Logradouro:
          <Input
            isDisabled={isLoading}
            id="Logradouro"
            value={formData.Logradouro}
            onChange={handleInputOnChange}
          />
        </FormLabel>
        <FormLabel>
          Número:
          <Input
            isDisabled={isLoading}
            id="Numero"
            type="number"
            value={formData.Numero}
            onChange={(event) =>
              setFormData((state) => ({
                ...state,
                Numero: Number(event.target.value),
              }))
            }
          />
        </FormLabel>
        <FormLabel>
          Bairro:
          <Input
            isDisabled={isLoading}
            id="Bairro"
            value={formData.Bairro}
            onChange={handleInputOnChange}
          />
        </FormLabel>
        <FormLabel>
          Cidade:
          <Input
            isDisabled={isLoading}
            id="Cidade"
            value={formData.Cidade}
            onChange={handleInputOnChange}
          />
        </FormLabel>
        <FormLabel>
          Estado:
          <Input
            isDisabled={isLoading}
            id="Estado"
            value={formData.Estado}
            onChange={handleInputOnChange}
          />
        </FormLabel>
        <FormLabel>
          Complemento:
          <Input
            isDisabled={isLoading}
            id="Complemento"
            value={formData.Complemento}
            onChange={handleInputOnChange}
          />
        </FormLabel>
        <Flex alignItems="center">
          <Button
            mt={5}
            colorScheme="green"
            onClick={handleOnClick}
            isLoading={isLoading}
          >
            salvar
          </Button>
          <Button
            mt={5}
            ml={2}
            colorScheme="green"
            variant="ghost"
            onClick={() => setComponentState(ComponentState.SHOW_DATA)}
          >
            cancelar
          </Button>
        </Flex>
      </FormControl>
    </VStack>
  );
}
