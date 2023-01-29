import { Divider, Flex, Text, VStack } from "@chakra-ui/react";
import { DocumentoTipo } from "@prisma/client";
import UploadFile from "../UploadFile";

export default function Documentos() {
  const handleSubmit = () => {};

  const fileTypeOptions = Object.values(DocumentoTipo).map((document) => {
    if (
      document === "CONTRATO_SOCIAL" ||
      document === "DAS" ||
      document === "NOTA_FISCAL" ||
      document === "TFF"
    ) {
      return (
        <option key={document} value={document}>
          {Mapper.mapDocumentType(document)}
        </option>
      );
    }
    return null;
  });

  return (
    <VStack alignItems="flex-start">
      <UploadFile
        handleSubmit={handleSubmit}
        fileTypeOptions={fileTypeOptions}
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
