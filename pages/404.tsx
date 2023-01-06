import { Text, VStack } from "@chakra-ui/react";
import MainContent from "../components/Containers/MainContent";

export default function Custom404() {
  return (
    <MainContent>
      <VStack spacing={5}>
        <Text fontSize="7xl">Esta funcionalidade ainda não foi criada</Text>
        <Text>Em breve teremos novidades!</Text>
      </VStack>
    </MainContent>
  );
}
