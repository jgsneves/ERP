import MainContent from "components/Containers/MainContent";
import { Link, Text } from "@chakra-ui/react";
import CreateNewDoctor from "components/Doctor/CreateNewDoctor";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function CadastrarMedico() {
  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Cadastrar novo médico
      </Text>
      <Text>Preencha todos os dados abaixo.</Text>
      <Link href="/medicos">
        <ArrowBackIcon boxSize={8} my="6" cursor="pointer" />
      </Link>

      <CreateNewDoctor />
    </MainContent>
  );
}
