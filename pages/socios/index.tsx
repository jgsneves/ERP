import { Text } from "@chakra-ui/react";
import MainContent from "../../components/Containers/MainContent";
import EmptyPartners from "../../components/Partner/EmptyPartners";
import PartnersList from "../../components/Partner/PartnersList";
import { Partner } from "../../models/Partner";

interface Props {
  partners: Partner[];
}

export default function Socios({ partners }: Props) {
  return (
    <MainContent>
      <Text fontSize="5xl" fontWeight={600}>
        Sócios
      </Text>
      <Text>Todos os sócios cadastrados da empresa.</Text>
      {partners ? <PartnersList partners={partners} /> : <EmptyPartners />}
    </MainContent>
  );
}
