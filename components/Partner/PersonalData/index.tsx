import { Button, useToast, VStack, Text } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { DateFormat } from "utils/DateFormat";
import PersonalDataForm from "./form";

export interface PersonalDataFormData {
  Nome: string;
  Cpf: string;
  DataNascimento: string;
  ModificadoEm: Date;
  Participacao: number;
}

interface Props {
  id: string;
  nome: string;
  cpf: string;
  participacao: number;
  dataNascimento: string;
}

export default function PersonalData({
  id,
  cpf,
  nome,
  participacao,
  dataNascimento,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [renderForm, setRenderForm] = useState<boolean>(false);

  const [formData, setFormData] = useState<PersonalDataFormData>({
    Nome: nome,
    Cpf: cpf,
    DataNascimento: dataNascimento,
    Participacao: participacao,
    ModificadoEm: new Date(),
  });

  const router = useRouter();
  const toast = useToast();

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { id, value } = event.target;

    setFormData((partner) => {
      if (id === "Participacao") {
        return {
          ...partner,
          [id]: Number(value),
        };
      }
      return {
        ...partner,
        [id]: value,
      };
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await axios
      .patch(`/api/socios/${id}`, formData)
      .catch((error: AxiosError) =>
        toast({
          status: "error",
          title: "Não foi possível editar sócio.",
          description: error.message,
          duration: 9000,
          isClosable: true,
        })
      )
      .then(() => {
        router.push(`/socios/${id}`);
        toast({
          status: "success",
          title: "Dados pessoais do sócio atualizados com sucesso!",
          duration: 5000,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {renderForm ? (
        <PersonalDataForm
          formData={formData}
          handleInputOnChange={handleInputOnChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          setRenderForm={setRenderForm}
        />
      ) : (
        <VStack alignItems="flex-start">
          <Text>Nome: {formData.Nome}</Text>
          <Text>Cpf: {formData.Cpf}</Text>
          <Text>
            Data de nascimento:{" "}
            {DateFormat.formatISODateStringToLocale(formData.DataNascimento)}
          </Text>
          <Text>Cota societária: {formData.Participacao}</Text>
          <Button
            colorScheme="green"
            mt="10"
            onClick={() => setRenderForm(true)}
            isLoading={isLoading}
          >
            Editar
          </Button>
        </VStack>
      )}
    </>
  );
}
