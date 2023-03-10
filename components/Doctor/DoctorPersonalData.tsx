import { Button, Text, VStack } from "@chakra-ui/react";
import ContentTitle from "components/Shared/ContentTitle";
import { DoctorEntity } from "pages/medicos/[id]";
import { Dispatch, SetStateAction } from "react";
import { DateFormat } from "utils/DateFormat";

interface Props {
  doctor: DoctorEntity;
  setIsEditState: Dispatch<SetStateAction<boolean>>;
}

export default function DoctorPersonalData({ doctor, setIsEditState }: Props) {
  return (
    <VStack alignItems="flex-start">
      <ContentTitle title="Dados pessoais" />
      <Text>Nome: {doctor.Nome}</Text>
      <Text>CPF: {doctor.Cpf}</Text>
      <Text>CRM: {doctor.Crm}</Text>
      <Text>
        Data de nascimento:{" "}
        {DateFormat.formatISODateStringToLocale(doctor.DataNascimento)}
      </Text>
      <Text>E-mail: {doctor.Email}</Text>
      <Text>Estado civil: {doctor.EstadoCivil}</Text>
      <Text>Nacionalidade: {doctor.Nacionalidade}</Text>
      <Text>PIS: {doctor.PIS}</Text>
      <Text>RG: {doctor.RG}</Text>
      <Text>Telefone pessoal: {doctor.TelefonePessoal}</Text>
      <Text>Título de eleitor: {doctor.TituloEleitor}</Text>
      <Button colorScheme="green" onClick={() => setIsEditState(true)}>
        editar
      </Button>
    </VStack>
  );
}
