import { Text, VStack } from "@chakra-ui/react";

interface Props {
  razaoSocial: string;
  cnpj: string;
}

export default function CompanyData({ cnpj, razaoSocial }: Props) {
  return (
    <VStack alignItems="flex-start">
      <Text>CNPJ: {cnpj}</Text>
      <Text>Razão social: {razaoSocial}</Text>
    </VStack>
  );
}
