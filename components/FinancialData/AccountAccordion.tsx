import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  VStack,
  Text,
  useToast,
  Accordion,
  Flex,
} from "@chakra-ui/react";
import { ContasCorrente } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { ErrorHandler } from "../../utils/ErrorHandler";

interface Props {
  position: number;
  account: ContasCorrente;
}

export default function AccountAccordion({ account, position }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const router = useRouter();

  const handleDeleteOnClick = () => {
    setIsLoading(true);

    axios
      .delete(`/api/contascorrente/${account.Id}`)
      .then(
        () => router.reload(),
        () => {
          toast({
            duration: 9000,
            title: "Não foi possível deletar esta conta.",
            isClosable: true,
            status: "error",
          });
        }
      )
      .catch((error: AxiosError) => ErrorHandler.logAxiosDeleteError(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <Accordion
      w="950px"
      allowToggle
      borderColor="transparent"
      borderLeft="4px"
      borderLeftColor="gray.300"
    >
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Conta corrente nº {position}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <VStack alignItems="flex-start">
            <Text>
              Código do banco:
              {account.CodigoBanco}
            </Text>
            <Text>
              Nome do banco:
              {account.NomeBanco}
            </Text>
            <Text>
              Agência:
              {account.Agencia}
            </Text>
            <Text>
              Dígito da agência:
              {account.AgenciaDigito}
            </Text>
            <Text>
              Conta corrente:
              {account.Conta}
            </Text>
            <Text>
              Dígito da conta:
              {account.ContaDigito}
            </Text>
            {account.ChavePix && (
              <Text>
                Chave PIX:
                {account.ChavePix}
              </Text>
            )}
            {account.ChavePix && (
              <Text>
                Tipo de chave PIX:
                {account.TipoChavePix}
              </Text>
            )}
          </VStack>
          <Button
            colorScheme="red"
            onClick={handleDeleteOnClick}
            isLoading={isLoading}
            mt={5}
          >
            deletar conta
          </Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
