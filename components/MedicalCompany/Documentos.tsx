import { Divider, Flex, Text, VStack } from "@chakra-ui/react";
import UploadFile from "../UploadFile";

export default function Documentos() {
  const handleSubmit = () => {};

  return (
    <VStack alignItems="flex-start">
      <UploadFile
        handleSubmit={handleSubmit}
        fileTypeOptions={["Contrato social", "Nota fiscal", "TFF", "DAS"]}
      />

      <Flex width="100%" alignItems="center" py={3}>
        <Text as="b" minW="fit-content" mr={2}>
          Contrato Social
        </Text>
        <Divider />
      </Flex>

      <Flex width="100%" alignItems="center" py={3}>
        <Text as="b" minW="fit-content" mr={2}>
          Notas fiscais
        </Text>
        <Divider />
      </Flex>

      <Flex width="100%" alignItems="center" py={3}>
        <Text as="b" minW="fit-content" mr={2}>
          TFFs (Taxa de Fiscalização de Funcionamento)
        </Text>
        <Divider />
      </Flex>

      <Flex width="100%" alignItems="center" py={3}>
        <Text as="b" minW="fit-content" mr={2}>
          DASs (Documento de Arrecadação do Simples Nacional)
        </Text>
        <Divider />
      </Flex>
    </VStack>
  );
}
