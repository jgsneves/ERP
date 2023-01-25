import { FormControl, FormLabel, Input, Button, Flex } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { PersonalDataFormData } from ".";
import { formatCPF } from "@brazilian-utils/brazilian-utils";

interface Props {
  formData: PersonalDataFormData;
  handleInputOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  handleSubmit: () => void;
  setRenderForm: Dispatch<SetStateAction<boolean>>;
}
export default function PersonalDataForm({
  formData,
  isLoading,
  handleInputOnChange,
  handleSubmit,
  setRenderForm,
}: Props) {
  const [dateInputValue, setDateInputValue] = useState<string>("");

  //TODO: codar handleDateInputOnBlur

  return (
    <FormControl maxW="500px">
      <FormLabel>
        Nome:
        <Input value={formData.Nome} id="Nome" onChange={handleInputOnChange} />
      </FormLabel>

      <FormLabel mt="5">
        Cpf:
        <Input
          value={formatCPF(formData.Cpf)}
          id="Cpf"
          onChange={handleInputOnChange}
        />
      </FormLabel>

      <FormLabel mt="5">
        Data de nascimento:
        <Input
          value={dateInputValue}
          id="DataNascimento"
          type="date"
          onChange={(event) => setDateInputValue(event.target.value)}
        />
      </FormLabel>

      <FormLabel mt="5">
        Cota societária:
        <Input
          value={formData.Participacao?.toString()}
          type="number"
          id="Participacao"
          onChange={handleInputOnChange}
        />
      </FormLabel>

      <Flex mt="10">
        <Button
          colorScheme="green"
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          Salvar
        </Button>
        <Button
          colorScheme="green"
          variant="ghost"
          onClick={() => setRenderForm(false)}
          ml={5}
        >
          Cancelar
        </Button>
      </Flex>
    </FormControl>
  );
}
