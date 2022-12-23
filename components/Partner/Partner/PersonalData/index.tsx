import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { Pessoas } from "@prisma/client";
import { useState } from "react";

interface Props {
  id: string;
  nome: string;
  cpf: string;
  participacao: number;
  handleSubmit: () => void;
  isLoading: boolean;
}

export default function PersonalData({
  id,
  cpf,
  nome,
  participacao,
  handleSubmit,
  isLoading,
}: Props) {
  const [formData, setFormData] = useState<Pessoas>({
    Nome: nome,
    Cpf: cpf,
    DataNascimento: new Date(),
    CriadoEm: new Date(),
    Id: id,
    Tipo: "SOCIO",
    Participacao: participacao,
    Crm: null,
    EmpresaMedicaId: null,
    EnderecoId: null,
    ModificadoEm: null,
    Salario: null,
    StatusAdmissao: null,
  });

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
    <FormControl maxW="500px" mt="14">
      <FormLabel>
        Nome:
        <Input value={formData.Nome} id="Nome" onChange={handleInputOnChange} />
      </FormLabel>

      <FormLabel mt="5">
        Cpf:
        <Input value={formData.Cpf} id="Cpf" onChange={handleInputOnChange} />
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

      <Button
        colorScheme="green"
        mt="10"
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Salvar
      </Button>
    </FormControl>
  );
}
