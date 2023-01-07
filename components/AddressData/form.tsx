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
import { useRouter } from "next/router";
import React, { useState } from "react";
import { v4 as uuid4 } from "uuid";
import { BrasilApi } from "../../services/BrasilApi";

interface Props {
  pessoaId?: string;
  empresaMedicaId?: string;
}

export default function AddressForm({ pessoaId, empresaMedicaId }: Props) {
  const [formData, setFormData] = useState<Enderecos>({
    Bairro: "",
    Cep: "",
    Cidade: "",
    Complemento: "",
    CriadoEm: new Date(),
    Estado: "",
    Id: uuid4(),
    Logradouro: "",
    ModificadoEm: null,
    PessoaId: pessoaId ?? null,
    EmpresaMedicaId: empresaMedicaId ?? null,
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

  const handleSaveOnClick = async () => {
    setIsLoading(true);
    await axios
      .post("/api/enderecos", formData)
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
        if (pessoaId) {
          router.push(`/socios/${pessoaId}`);
        } else if (empresaMedicaId) {
          router.push(`/empresas-medicas/${empresaMedicaId}`);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <VStack spacing={5}>
      <Text my={5}>
        Nenhum endereço encontrado para este sócio. Cadastre um novo.
      </Text>
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
          onClick={handleSaveOnClick}
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </FormControl>
    </VStack>
  );
}
