import { isValidCEP } from "@brazilian-utils/brazilian-utils";
import {
  VStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Enderecos } from "@prisma/client";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { BrasilApi } from "../../services/BrasilApi";
import { useRouter } from "next/router";

interface Props {
  endereco: Enderecos;
}

export default function EditAddress({ endereco }: Props) {
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
  } = endereco;

  const [formData, setFormData] = useState<Enderecos>({
    Bairro,
    Cep,
    Cidade,
    Complemento,
    CriadoEm,
    Estado,
    Id,
    Logradouro,
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

  const handleOnClick = async () => {
    setIsLoading(true);

    await axios
      .put(`/api/enderecos/${Id}`, formData)
      .catch((error: AxiosError) =>
        toast({
          duration: 9000,
          title: "Não foi possível salvar o endereço!",
          description: error.message,
          status: "error",
          isClosable: true,
        })
      )
      .then(() => {
        toast({
          status: "success",
          title: "Endereço salvo com sucesso!",
          duration: 5000,
        });
        router.reload();
      })
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
        <Button
          mt={5}
          colorScheme="green"
          onClick={handleOnClick}
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </FormControl>
    </VStack>
  );
}