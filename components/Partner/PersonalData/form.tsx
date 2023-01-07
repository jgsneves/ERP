import { FormControl, FormLabel, Input, Button, Flex } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
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
  const formatDate = (date: Date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

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
          value={formatDate(formData.DataNascimento)}
          id="DataNascimento"
          type="date"
          onChange={handleInputOnChange}
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
