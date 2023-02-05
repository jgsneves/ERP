import { Text, VStack } from "@chakra-ui/react";
import { DocumentoTipo } from "@prisma/client";
import { EnumFormat } from "../../utils/EnumFormat";
import pdfImage from "../../public/pdf-file-image.png";
import Image from "next/image";

interface Props {
  url: string;
  tipo: DocumentoTipo;
}

export default function Document({ tipo, url }: Props) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <VStack
        borderStyle="solid"
        borderColor="blackAlpha.800"
        borderRadius="lg"
        borderWidth="2px"
        p={3}
        _hover={{ backgroundColor: "gray.300" }}
        w="150px"
      >
        <Image alt="pdf" src={pdfImage} width={50} />
        <Text as="b" textAlign="center" fontSize="sm">
          {EnumFormat.formatDocumentTypeEnum(tipo)}
        </Text>
      </VStack>
    </a>
  );
}
