import { Alert, AlertIcon, Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <VStack>
      <Alert status="error">
        <AlertIcon />
        Houve algum erro! Tente novamente recarregando a página
      </Alert>
      <Button colorScheme="green" onClick={() => router.reload()}>
        recarregar
      </Button>
    </VStack>
  );
}
