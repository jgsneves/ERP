import MainContent from "../../components/Containers/MainContent";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EmpresasMedicas } from "@prisma/client";
import { v4 as uuid4 } from "uuid";
import { BrasilApi } from "../../services/BrasilApi";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { isValidCNPJ, formatCNPJ } from "@brazilian-utils/brazilian-utils";

export default function CadastrarEmpresaMedica() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<EmpresasMedicas>({
    Cnpj: "",
    ContaCorrenteId: null,
    CriadoEm: new Date(),
    EnderecoId: null,
    Id: uuid4(),
    ModificadoEm: null,
    RazaoSocial: "",
  });

  const router = useRouter();
  const toast = useToast();

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((state) => ({ ...state, [id]: value }));
  };

  const handleOnBlurCNPJInput = async () => {
    if (isValidCNPJ(formData.Cnpj)) {
      const { data } = await BrasilApi.getCNPJ(Number(formData.Cnpj));
      setFormData((state) => ({
        ...state,
        RazaoSocial: data.razao_social,
      }));
    }
  };

  const handleSaveOnClick = () => {
    setIsLoading(true);
    axios
      .post("/api/empresasmedicas", formData)
      .then(() => {
        toast({
          duration: 5000,
          status: "success",
          title: "Empresa médica criada com sucesso!",
        });
        router.push("/empresas-medicas");
      })
      .catch((error: AxiosError) =>
        toast({
          duration: 9000,
          status: "error",
          title: "Não foi possível criar a empresa.",
          description: error.message,
        })
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Cadastrar empresa médica
      </Text>
      <Text>Preencha os dados abaixo para cadastrar uma nova empresa.</Text>
      <VStack>
        <FormControl>
          <FormLabel>
            CNPJ:
            <Input
              id="Cnpj"
              value={formatCNPJ(formData.Cnpj)}
              onChange={handleInputOnChange}
              onBlur={handleOnBlurCNPJInput}
            />
          </FormLabel>
          <FormLabel>
            Razão Social:
            <Input
              id="RazaoSocial"
              value={formData.RazaoSocial}
              onChange={handleInputOnChange}
            />
          </FormLabel>
          <Button
            onClick={handleSaveOnClick}
            colorScheme="green"
            mt={5}
            isLoading={isLoading}
          >
            Salvar
          </Button>
        </FormControl>
      </VStack>
    </MainContent>
  );
}
