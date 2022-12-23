import { Button, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  helperText: string;
}

export default function EmptyEntityList({ helperText }: Props) {
  return (
    <VStack
      border="2px"
      borderColor="gray.500"
      borderRadius="lg"
      padding={6}
      alignItems="center"
      maxWidth="600"
      mt="10"
    >
      <Text mb="6">{helperText}</Text>
      <Button colorScheme="green">
        <Link href="/socios/cadastrar">Cadastrar</Link>
      </Button>
    </VStack>
  );
}
